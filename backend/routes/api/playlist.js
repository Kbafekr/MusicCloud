// backend/routes/api/playlist.js
const express = require('express');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment, playlist, playlistsong } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateplaylist = [
  check('name')
    .exists({ checkFalsy: true })
    .isLength({min: 1})
    .withMessage('name must be at least one character and be present'),
  handleValidationErrors
];


//get all playlists created by the current user


router.get('/current', restoreUser, requireAuth, async (req, res) => {
  const userId = req.user.id

  const UserPlaylists = await playlist.findAll({
    where: {
      userId: req.user.id
          },
          attributes: {
            include: ['id', 'userId', 'name', 'createdAt', 'updatedAt', 'imageUrl']
          }
          })

  if (!UserPlaylists) {
    const errors = {
      'title': "Error retrieving playlists",
      'statusCode': 404,
      'message': {}
    }

    errors.message = "playlists do not exist/could not be found with associated user"
    return res.status(404).json(errors)
  }

  return res.json(UserPlaylists)
})

//create a playlist

router.post('/', restoreUser, requireAuth, validateplaylist, async (req, res) => {
  const UserId = req.user.id
  const {name, imageUrl} = req.body

  const NewPlaylist = await playlist.create({
    userId: UserId,
    name: name,
    imageUrl: imageUrl
  })

  res.status(201).json(NewPlaylist)
})







//add a song to a playlist based on the playlist's id


router.post('/:playlistId/songs', restoreUser, requireAuth, async (req, res) => {
  const playlistId = req.params.playlistId

  const UserId = req.user.id

  const {songId} = req.body

  const findsong = await Song.findByPk(songId)
  const findPlaylist = await playlist.findByPk(playlistId)

  //if both playlist and song cannot be found
  if ((!findPlaylist) && (!findsong)) {
    const errors = {
    'title': "Error retrieving playlist and song",
    'statusCode': 404,
    'message': {}
  }
  errors.message = "playlist and song could not be found with given id"
  res.status(404).json(errors)
  }
  //if song cant be found
  if (!findsong) {
    const errors = {
      'title': "Error retrieving song",
      'statusCode': 404,
      'message': {}
    }
    errors.message = "song does not exist/could not be found with requested id"
    res.status(404).json(errors)
  }

  //if there is no playlist
  if (!findPlaylist) {
    const errors = {
    'title': "Error retrieving playlist",
    'statusCode': 404,
    'message': {}
  }
  errors.message = "playlist does not exist/could not be found with requested id"
  res.status(404).json(errors)
  }


  // if user doesnt own playlist
  if (findPlaylist.userId !== UserId) {
    const errors = {
      'title': "Error authenticating user",
      'statusCode': 403,
      'message': {}
    }
    errors.message = "playlist does not belong to user"
    res.status(403).json(errors)
  }

  const createPlaylistSong = await playlistsong.create({
    songId: songId,
    playlistId: playlistId
  })

  const findPlaylistSong = await playlistsong.findOne({
    where: {
        "playlistId": playlistId, "songId": songId
    },
    attributes: {include: ['id', 'playlistId', 'songId'],
                 exclude: ['createdAt', 'updatedAt']}
  })
  return  res.status(201).json(findPlaylistSong)
})




//get details of a playlist from an id

router.get('/:playlistId', restoreUser, requireAuth, async (req,res) => {
  const PlaylistId = req.params.playlistId

  const findPlaylist = await playlist.findByPk(PlaylistId,
    {
      attributes: {
        include: ['id', 'userId', 'name', 'imageUrl', 'createdAt', 'updatedAt']
      },
      include: [
      {model: Song,
          through: {
            attributes: []
                    }
      }
    ]
    })

    if (!findPlaylist) {
      const errors = {
        'title': "Error retrieving playlist",
        'statusCode': 404,
        'message': {}
      }
      errors.message = "playlistcould not be found with given id"
      res.status(404).json(errors)
      }
      return res.json(findPlaylist)
})


//edit a playlist


router.put('/:playlistId', restoreUser, requireAuth, validateplaylist, async (req,res) => {
  const PlaylistId = req.params.playlistId
  const UserId = req.user.id
  const findPlaylist = await playlist.findByPk(PlaylistId,
    {
      attributes: {
        include: ['id', 'userId', 'name', 'imageUrl', 'createdAt', 'updatedAt']
      },
    })
  const {name, imageUrl} = req.body

  if (!findPlaylist) {
  const errors = {
    'title': "Error retrieving playlist",
    'statusCode': 404,
    'message': {}
  }
  errors.message = "playlistcould not be found with given id"
  res.status(404).json(errors)
  }

  if (findPlaylist.userId !== UserId) {
    const errors = {
      'title': "Error authenticating user",
      'statusCode': 403,
      'message': {}
    }
    errors.message = "playlist does not belong to user"
    res.status(403).json(errors)
  }

  if (name) findPlaylist.name = name
  if (imageUrl) findPlaylist.imageUrl = imageUrl
  await findPlaylist.save()
  return res.json(findPlaylist)

})


//delete a playlist

router.delete('/:playlistId', requireAuth, restoreUser, async (req, res) => {
  const userId = req.user.id
  const PlaylistId = req.params.playlistId
  const deletePlaylist = await playlist.findOne({
      where: {
          id: PlaylistId
      }
  })

  if (!deletePlaylist) {
    const errors = {
      'title': "Error retrieving playlist",
      'statusCode': 404,
      'message': {}
    }

    errors.message = "Song does not exist, could not be found with requested id"
    return res.status(404).json(errors)
  }

  if (userId !== deletePlaylist.userId) {
    const errors = {
      'title': "Error authenticating user",
      'statusCode': 403,
      'message': {}
    }
    errors.message = "Playlist does not belong to current user"
    return res.status(403).json(errors)
  }

  await deletePlaylist.destroy()
  const success = {
    'message': 'playlist successfully deleted',
    'statusCode': '200'
  }
  res.status(200).json(success)
})


module.exports = router;
