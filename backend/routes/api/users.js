// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Comment, playlist } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateSignup = [
  check('email')
  .exists({ checkFalsy: true })
  .isEmail()
  .withMessage('Please provide a valid email.'),
  check('username')
  .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
    check('firstName')
  .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please provide a firstName with at least 2 characters.'),
    check('firstName')
    .not()
    .isEmail()
    .withMessage('firstName cannot be an email.'),
    check('lastName')
  .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please provide a lastName with at least 2 characters.'),
    check('lastName')
    .not()
    .isEmail()
    .withMessage('lastName cannot be an email.'),
    check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

  //make a validation for login that passes error into handle validation errors



  let where = {};

// Sign up
router.post('/', validateSignup, async (req, res, next) => {

  const errorCode = {
    'title': "User already exists",
    'statusCode': 403,
    'message': {}
  }

  const {firstName, lastName, email, username, password} = req.body;

  const EmailInput = await User.findOne({where: {email}});
  const UsernameInput = await User.findOne({where: {username}});

  if (EmailInput && UsernameInput) {
    errorCode.message = "Email and Username already associated with a user"
    return res.status(403).json(errorCode)
  }

  if (EmailInput) {
    errorCode.message = "Email already associated with a user"
    return res.status(403).json(errorCode)
  }

  if (UsernameInput) {
    errorCode.message = "Username already associated with a user"
    return res.status(403).json(errorCode)
  }

  const user = await User.signup({firstName, lastName, email, username, password });


  const token = setTokenCookie(res, user);

  user.token = token

  delete user.createdAt;
  delete user.updatedAt;

  await user.save()

  return res.json({
      "id": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
      "username": user.username,
      "token": user.token
    });
});

//current user

router.get('/current', restoreUser, requireAuth, async (req, res) => {
  const currentUser = await User.findOne({
      where: {
        id: req.user.id
      },
      attributes: {include: ['id', 'firstName', 'lastName', 'username', 'email',]}
  });
  const {token} = req.cookies
  currentUser.token = token
  currentUser.save()
 return res.json(currentUser)
});





//get details of an artist from an id using /artists/:artistId


router.get('/:userId', restoreUser, requireAuth, async (req, res) => {
  const ArtistId = req.params.userId
  const findArtist = await User.findByPk(ArtistId, {
    attributes: [
      'id',
      'username',
      'imageUrl'
  ]
  })


  if (!findArtist) {
      const errors = {
        'title': "Error retrieving Artist",
        'statusCode': 404,
        'message': {}
      }

      errors.message = "Artist does not exist, associated Artist could not be found with requested id"
      return res.status(404).json(errors)
    }


    const totalSongs = await Song.count({
      where: {
          userId: ArtistId
      }
  })

    const totalAlbums = await Album.count({
      where: {
          userId: ArtistId
      }
    })
    const response = {findArtist, totalSongs, totalAlbums}

    res.json(response)

  })













//get all songs of an artist based on artists id

router.get('/:userId/songs', restoreUser, requireAuth, async (req, res) => {
  const ArtistId = req.params.userId
  const findArtist = await User.findByPk(ArtistId)

  if (!findArtist) {
      const errors = {
        'title': "Couldn't find an Artist with the specified id",
        'statusCode': 404,
        'message': {}
      }

      errors.message = "Artist couldn't be found"
      return res.status(404).json(errors)
    }


    const ArtistsSongs = await Song.findAll({
      where: {
          id: ArtistId
      }
    })
    if (!ArtistsSongs) {
      const errors = {
        'title': "Error retrieving Songs",
        'statusCode': 404,
        'message': {}
      }

      errors.message = "Artist with requested id does not have songs."
      return res.status(404).json(errors)
    }
    const response = {
      "Songs": ArtistsSongs
    }
    res.json(response)
  })









//get all albums of an artist based on the artists id

router.get('/:userId/albums', restoreUser, requireAuth, async (req, res) => {
  const ArtistId = req.params.userId
  const findArtist = await User.findByPk(ArtistId)

  if (!findArtist) {
      const errors = {
        'title': "Error retrieving Artist",
        'statusCode': 404,
        'message': {}
      }

      errors.message = "Artist does not exist, associated Artist could not be found with requested id"
      return res.status(404).json(errors)
    }


    const ArtistsAlbums = await Album.findAll({
      where: {
          id: ArtistId
      }
    })
    if (!ArtistsAlbums) {
      const errors = {
        'title': "Error retrieving Albums",
        'statusCode': 404,
        'message': {}
      }

      errors.message = "Artist with requested id does not have albums."
      return res.status(404).json(errors)
    }

    res.json(ArtistsAlbums)
  })



  //get all playlists by user id

  router.get('/:userId/playlists', restoreUser, requireAuth, async (req, res, next) => {
    const userId = req.params.userId;

    const UserCurrent = await User.findByPk(userId)

    if (!UserCurrent) {

      const errors = {
        'title': "Error retrieving User",
        'statusCode': 404,
        'message': {}
      }
      errors.message = "User does not exist/could not be found with requested id"
      res.status(404).json(errors)
      }

      const UserPlaylist = await playlist.findAll({
        where: {
          userId: userId
        },
        attributes: {include: ['id', 'userId', 'name', 'imageUrl', 'createdAt', 'updatedAt']}
      })

      if (!UserPlaylist) {
        const errors = {
          'title': "Error retrieving playlist",
          'statusCode': 404,
          'message': {}
        }
        errors.message = "playlist does not exist/could not be found with requested id"
        res.status(404).json(errors)
        }


      res.json(UserPlaylist)
    })



module.exports = router;
