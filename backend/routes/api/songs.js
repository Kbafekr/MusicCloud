// backend/routes/api/songs.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const SongValidation = [
  check('title')
  .exists({ checkFalsy: true })
  .isLength({ min: 2})
  .withMessage('Song title must be at least two characters.'),
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

//get all songs
  router.get('/', async (req, res) => {
    const mySongs = await Song.findAll({
        where: {}
    })
    res.json(mySongs)
  })

  //get all songs created by the current User

  router.get('/current', async (req, res) => {
    const user = req.user.id
    const userSongs = await Song.findAll(
        {where: {
            userId: user
  }})
  res.json(userSongs)
  })

  //get song details by Id

  router.get('/:songId', async (req, res) => {
    const theSong = await Song.findOne({
      where: {
        id: req.params.id
      },
        include: [{ model: User}]
    });

    return res.json(theSong);
});

  //create a song for an album based on albums id

  router.post('/userSongs', async (req, res) => {
    const {userId, albumId, title, description, url} = req.body

    const albumSong = await Album.findOne({
        where: {
            albumId: albumId
        }
    })
  })
  //edit song

router.put('/:songId', async (req, res) => {
    const {id, userId, albumId, title, description, url} = req.body


const editSong = await Song.findOne({
    where: {
        id: id
    }
})
res.json(editSong)
})
  //delete a song

  router.delete('/userSong', async (req, res) => {
    const deleteSong = await Song.findOne({
        where: {
            id: req.params.id
        }
    })
    res.json(deleteSong.destroy())
  })

  module.exports = router
