// backend/routes/api/genre.js
const express = require('express');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Genre, playlist } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateGenre = [
  check('body')
    .exists({ checkFalsy: true })
    .isLength({min: 1})
    .withMessage('body must be at least one character and be present'),
  handleValidationErrors
];

// get all genres

router.get('/all', restoreUser, async (req, res) => {
  const genres = await Genre.findAll({
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
    'Genre': genres
  }
  res.json(response)
})

// edit a Genre

router.put('/:GenreId', restoreUser, requireAuth, validateGenre, async (req, res) => {
  const GenreId = req.params.GenreId
  const userId = req.user.id
  const {body} = req.body
  let GenreEdit = await Genre.findByPk(GenreId)

  if (!GenreEdit) {
    const errors = {
      'title': "Error retrieving Genres",
      'statusCode': 404,
      'message': {}
    }

    errors.message = "Genre does not exist, associated Genres could not be found with requested id"
    return res.status(404).json(errors)
  }

  if (userId !== GenreEdit.userId) {
    const errors = {
      'title': "Error authenticating user",
      'statusCode': 403,
      'message': {}
    }
    errors.message = "Genre does not belong to current user"
    return res.status(403).json(errors)
  }

  if (body) {GenreEdit.genre = body }
      await GenreEdit.save()

  return res.status(200).json(GenreEdit)
})
// delete a Genre

router.delete('/:Genreid', requireAuth, restoreUser, async (req, res) => {
const GenreId = req.params.Genreid
const userId = req.user.id


  const deleteGenre = await Genre.findOne({
      where: {
          id: GenreId
      }
  })

  if (!deleteGenre) {
    const errors = {
      'title': "Error retrieving Genre",
      'statusCode': 404,
      'message': {}
    }

    errors.message = "Genre does not exist, could not be found with requested id"
    return res.status(404).json(errors)
  }

  if (userId !== deleteGenre.userId) {
    const errors = {
      'title': "Error authenticating user",
      'statusCode': 403,
      'message': {}
    }
    errors.message = "Genre does not belong to current user"
    return res.status(403).json(errors)
  }

  await deleteGenre.destroy()
  const success = {
    'message': 'Genre successfully deleted',
    'statusCode': '200'
  }
  res.status(200).json(success)
})










module.exports = router;
