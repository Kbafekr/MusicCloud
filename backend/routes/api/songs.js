// backend/routes/api/songs.js
const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

//get all songs
  router.get('/', async (req, res) => {
    const allSongs = await Song.findAll({
        where: {}
    })
    res.json(allSongs)
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
        include: [{ model: User}]
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

    res.json(deleteSong.destroy())
  })

  //create a song for an album based on albums id

// router.post('/:albumId/songs', restoreUser, requireAuth, async (req, res) => {
//   const {title, description, url, imageUrl} = req.body
//   const AlbumId = req.params.albumId
//   const userId = req.user.id
//   const album = await Album.findOne({
//       where: {
//           id: AlbumId
//       }
//   })

//   if (!album) {
//     const errors = {
//       'title': "Error retrieving album",
//       'statusCode': 404,
//       'message': {}
//     }
//     errors.message = "Album does not exist/could not be found with requested id"
//     return res.status(404).json(errors)
//   }

//   if (req.user.id !== album.userId) {
//   const errors = {
//     'title': "Error authenticating user",
//     'statusCode': 403,
//     'message': {}
//   }
//   errors.message = "Album does not belong to current user"
//   return res.status(404).json(errors)
// }
//   const newSong = await Song.create({
//      userId: userId,
//      albumId: AlbumId,
//      title: title,
//      description: description,
//      url: url,
//      imageUrl: imageUrl

//   })
//   return res.status(201).json(newSong)
// })

  module.exports = router
