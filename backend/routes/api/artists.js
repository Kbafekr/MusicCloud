// backend/routes/api/artists.js
const express = require('express');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment, playlist } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateArtist = [
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
      attributes: {include: ['id', 'username', 'imageUrl']}
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
      const response = {
        'id': findArtist.id,
        'username': findArtist.username,
        'imageUrl': findArtist.imageUrl,
        'totalSongs': totalSongs,
        'totalAlbums': totalAlbums,
      }

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
        },
        attributes: { include: [
          'id', 'userId', 'title', 'description', 'imageUrl', 'createdAt', 'updatedAt'
        ]}
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

      const response = {
        'Albums': ArtistsAlbums
      }
      res.json(response)
    })


//get all playlists by artist id

router.get('/:artistId/playlists', restoreUser, requireAuth, async (req, res, next) => {
  const userId = req.params.artistId;

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
      const response = {
        'Playlists': UserPlaylist
      }
    res.json(response)
  })




module.exports = router;
