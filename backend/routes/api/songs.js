// backend/routes/api/songs.js
const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment, playlist } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { route } = require('./comments');
const e = require('express');

const router = express.Router();


const SongValidation = [
  check('title')
  .exists({ checkFalsy: true })
  .isLength({ min: 2})
  .withMessage('Song title must be at least two characters.'),
  check('description')
  .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a valid description'),
    check('url')
    .exists({ checkFalsy: true })
    .isLength({ min: 2})
    .withMessage('Username cannot be an email.'),
    handleValidationErrors
  ];


 //  if ((!Number.isInteger(page) || page <= 0) || (!Number.isInteger(size) || size <= 0) ) {
  //      const errors = {
  //        'title': "Error retrieving songs with query parameters",
  //        'statusCode': 400,
  //        'errors': {}
  //      }

  //       if (!Number.isInteger(page) || page <= 0) {
  //         errors.errors.page = "Page value in query must be a number greater than 0"
  //         }

  //       if (!Number.isInteger(size) || size <= 0) {
  //         errors.errors.size = "size value in query must be a number greater than 0"
  //       }

  //       if (!Number.isInteger(size) || size <= 0) {
  //         errors.errors.size = "size value in query must be a number greater than 0"
  //       }

  //      res.status(400).json(errors)
  //    }
  const QuerySearchValidation = [
    check('title')
      .optional({nullable: true})
      .isLength({ min: 1})
      .withMessage('Song title must be longer than one character'),
    check('createdAt')
     .isDate()
      .optional({nullable: true})
      .withMessage('please provide a valid date'),
    check('page')
      .optional({nullable: true})
      .isInt({min: 0})
      .withMessage('page must be a number greater than -1'),
    check('size')
      .optional({nullable: true})
      .isInt({min: 0})
      .withMessage('size must be a number greater than -1'),
      handleValidationErrors
    ];

  //add query filters to get all songs

  //get all songs
    router.get('/', restoreUser, requireAuth, QuerySearchValidation, async (req, res) => {

      let {page, size, title, createdAt} = req.query
      let where = {};

      if (title) where.title = title
      if (createdAt) where.createdAt = createdAt

      page = parseInt(page)
      size = parseInt(size)

      if ((!page) || page > 10) page = 0
      if ((!size) || size > 20) size = 20

             let pagination = {}


         pagination.limit = size
         pagination.offset = size * (page - 1)

      const allSongs = await Song.findAll({
          where: { ...where },
          ...pagination
      })

      if (!allSongs) {
        const errors = {
          'title': "Error retrieving songs",
          'statusCode': 404,
          'message': {}
        }

        errors.message = "Songs could not be found with requested parameters"
        res.status(404).json(errors)
      }
      const response = {
        "Songs": allSongs,
        "page": page,
        "size": size
      }
      res.json(response)
    })




  //get all songs created by the current User

  router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id
    const userSongs = await Song.findAll(
        {where: {
            userId: user
  }})
  res.json(userSongs)
  })

  //get song details by Id

  router.get('/:songid', restoreUser, requireAuth, async (req, res) => {
    const theSong = await Song.findOne({
      where: {
        id: req.params.songid
      },
        include: [{ model: User, as: 'Artist'}, {model: Album}]
    });

    if (!theSong) {
      const errors = {
        'title': "Error retrieving song",
        'statusCode': 404,
        'message': {}
      }

      errors.message = "Song does not exist/could not be found with requested id"
      res.status(404).json(errors)
    }

    return res.json(theSong);
});


  //create a song for an album based on albums id

router.post('/', restoreUser, requireAuth, async (req, res) => {
  const {title, description, url, imageUrl, albumId} = req.body
  const userId = req.user.id
  const album = await Album.findOne({
      where: {
          id: albumId
      }
  })

  if (!album) {
    const errors = {
      'title': "Error retrieving album",
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
  errors.message = "Album does not belong to current user"
  return res.status(403).json(errors)
}
  const newSong = await Song.create({
     userId: userId,
     albumId: albumId,
     title: title,
     description: description,
     url: url,
     imageUrl: imageUrl

  })
  return res.status(201).json(newSong)
})

  //edit song

router.put('/:id', requireAuth, SongValidation, async (req, res) => {
    const {title, description, url} = req.body

    const Id = req.params.id

const editSong = await Song.findOne({
    where: {
        id: Id
    }
})

if (!editSong) {
  const errors = {
    'title': "Error retrieving song",
    'statusCode': 404,
    'message': {}
  }
  errors.message = "Song does not exist/could not be found with requested id"
  return res.status(404).json(errors)
}

if (title) {editSong.title = title }
if (description) {editSong.description = description }
if (url) {editSong.url = url }

await editSong.save()
return res.status(201).json(editSong)
})



  //delete a song

  router.delete('/:id', requireAuth, restoreUser, async (req, res) => {
    const userId = req.user.id
    const deleteSong = await Song.findOne({
        where: {
            id: req.params.id
        }
    })

    if (!deleteSong) {
      const errors = {
        'title': "Error retrieving song",
        'statusCode': 404,
        'message': {}
      }

      errors.message = "Song does not exist, could not be found with requested id"
      return res.status(404).json(errors)
    }

    if (userId !== deleteSong.userId) {
      const errors = {
        'title': "Error authenticating user",
        'statusCode': 403,
        'message': {}
      }
      errors.message = "Comment does not belong to current user"
      return res.status(403).json(errors)
    }

    await deleteSong.destroy()
    const success = {
      'message': 'song successfully deleted',
      'statusCode': '200'
    }
    res.status(200).json(success)
  })



  // get all Comments by a Song's id

  router.get('/:songId/comments', restoreUser, requireAuth, async (req, res) => {
    const SongId = req.params.songId

    const SongComments = await Comment.findByPk(SongId)
    if(!SongComments) {
      const errors = {
        'title': "Error retrieving song comments",
        'statusCode': 404,
        'message': {}
      }

      errors.message = "Song does not exist, associated comments could not be found with requested id"
      return res.status(404).json(errors)
    }

    return res.json(SongComments)
  })



  //create a comment for a song based on Song's id

  router.post('/:songId/comments', restoreUser, requireAuth, async (req, res) => {
    const SongId = req.params.songId
    const UserId = req.user.id
    const {body} = req.body

    const findSong = await Song.findByPk(SongId)


    if (!findSong) {
      const errors = {
        'title': "Error retrieving song comments",
        'statusCode': 404,
        'message': {}
      }

      errors.message = "Song does not exist, associated comments could not be found with requested id"
      return res.status(404).json(errors)
    }

    const comment = await Comment.create({
      userId: UserId,
      songId: SongId,
      body: body
    })
     return res.json(comment)
  })


  module.exports = router
