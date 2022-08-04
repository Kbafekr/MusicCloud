// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

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
    'title': "Forbidden: Username and/or email already exists",
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

  await user.save()

  return res.json({ user, token });
});

//current user

router.get('/current', requireAuth, async (req, res) => {
  const allUsers = await User.findOne({
      where: {
        id: req.user.id
      }

  });
  res.json(allUsers);
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
        'title': "Error retrieving Artist",
        'statusCode': 404,
        'message': {}
      }

      errors.message = "Artist does not exist, associated Artist could not be found with requested id"
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

    res.json(ArtistsSongs)
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


module.exports = router;
