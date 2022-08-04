// backend/routes/api/artists.js
const express = require('express');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment, Playlist } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateComment = [
  check('body')
    .exists({ checkFalsy: true })
    .isLength({min: 1})
    .withMessage('body must be at least one character and be present'),
  handleValidationErrors
];


//get details of an artist from an id using /artists/:artistId


router.get('/:artistId', restoreUser, requireAuth, async (req, res) => {
    const ArtistId = req.params.artistId
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

router.get('/:artistId/songs', restoreUser, requireAuth, async (req, res) => {
    const ArtistId = req.params.artistId
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


//get all playlists of an artist based on the artists id




module.exports = router;
