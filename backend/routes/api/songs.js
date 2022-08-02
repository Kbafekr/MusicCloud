// backend/routes/api/songs.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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
    const {songId} = req.params
    const songDetails = await Song.findOne({
        where: {
            id: songId
        },
        include: [{
            model: User
        }]
    })

    res.json(songDetails)
  })

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

router.put('/userSongs', async (req, res) => {
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
