// backend/routes/api/session.js
const express = require('express');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateLogin = [
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

router.get('/', async (req, res) => {
  const albums = await Album.findAll({
    where: {}
  })
  res.json(albums)
})

//get all albums created by current user

router.get('/', requireAuth, async (req, res) => {{
  const Allalbums = await Album.findAll({
    where: {
      userId: req.user.id
    }
  })
  res.json(Allalbums)
}}

)
//get details of an album from an id

// router.get('')
//create an album

//edit an album

//delete an album

module.exports = router;
