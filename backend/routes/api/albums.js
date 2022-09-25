// backend/routes/api/session.js
const express = require('express');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment, playlist } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateAlbum = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({min: 2})
    .withMessage('Album title must be at least two characters and present'),
  check('description')
    .exists({ checkFalsy: true })
    .isLength({min: 2})
    .withMessage('Description must be at least two characters and present'),
  handleValidationErrors
];

// get all Albums

router.get('/', restoreUser, async (req, res) => {
  const albums = await Album.findAll({
    where: {},
    include: [{ model: User, as: 'Artist',
    attributes: ['id', 'username', 'imageUrl']
     }, {model: Song,
       attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'imageUrl']},
     ],
     attributes: { include: [
      'id', 'userId', 'title', 'description', 'imageUrl', 'createdAt', 'updatedAt'
    ],
  }})
  const response = {
    'Albums': albums
  }
  res.json(response)
})

//get all albums created by current user

router.get('/current', restoreUser, requireAuth, async (req, res) => {{
  const Allalbums = await Album.findAll({
    where: {
      userId: req.user.id
    },
    attributes: { include: [
      'id', 'userId', 'title', 'description', 'imageUrl', 'createdAt', 'updatedAt'
    ]}
  })
  const response = {
    'Albums': Allalbums
  }
  res.json(response)
}}
)

//get details of an album from an id

router.get('/:albumid', restoreUser, requireAuth, async (req,res) => {
  const AlbumId = req.params.albumid

  const albumdetails = await Album.findByPk(AlbumId, {

    include: [{ model: User, as: 'Artist',
     attributes: ['id', 'username', 'imageUrl']
      }, {model: Song,
        attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'imageUrl']}
  ]

  })
  if (!albumdetails) {
    const errors = {
      'title': "Error retrieving Album",
      'statusCode': 404,
      'message': {}
    }
    errors.message = "Album does not exist/could not be found with requested id"
    return res.status(404).json(errors)
  }

  return res.status(200).json(albumdetails)
})

//create an album

router.post('/', restoreUser, requireAuth, validateAlbum, async (req, res) => {
  const UserId = req.user.id;

  const {title, description, imageUrl} = req.body

  const newAlbum = await Album.create({
    userId: UserId,
    title: title,
    description: description,
    imageUrl: imageUrl || "https://cdn.pixabay.com/photo/2020/01/31/19/26/vinyl-4808792_1280.jpg"
  })
  res.status(201).json(newAlbum)
})


//edit an album

router.put('/:albumid', restoreUser, requireAuth, validateAlbum, async (req, res) => {
 const userId = req.user.id
 const AlbumId = req.params.albumid
 const {title, description, imageUrl} = req.body

 const album = await Album.findByPk(AlbumId)

 if (!album) {
  const errors = {
    'title': "Error retrieving Album",
    'statusCode': 404,
    'message': {}
  }
  errors.message = "Album does not exist/could not be found with requested id"
  return res.status(404).json(errors)
 }

  if (userId !== album.userId) {
    const errors = {
      'title': "Error authenticating user",
      'statusCode': 403,
      'message': {}
    }
    errors.message = "Album does belong to current user"
    return res.status(403).json(errors)
  }

  if (title) {album.title = title}
  if (description) {album.description = description }
  if (imageUrl) {album.imageUrl = imageUrl }

await album.save()
return res.status(201).json(album)
})

//delete an album

router.delete('/:albumid', restoreUser, requireAuth, async (req, res) => {
  const albumId = req.params.albumid
  const userId = req.user.id
  const album = await Album.findByPk(albumId)

  if (!album) {
    const errors = {
      'title': "Error retrieving Album",
      'statusCode': 404,
      'message': {}
    }
    errors.message = "Album does not exist/could not be found with requested id"
    return res.status(404).json(errors)
   }

    if (userId !== album.userId) {
      const errors = {
        'title': "Error authenticating user",
        'statusCode': 403,
        'message': {}
      }
      errors.message = "Album does belong to current user"
      return res.status(403).json(errors)
    }

    await album.destroy()
    const success = {
      'message': 'album successfully deleted',
      'statusCode': '200'
    }
    res.status(200).json(success)
  })
module.exports = router;
