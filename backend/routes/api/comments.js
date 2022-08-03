// backend/routes/api/session.js
const express = require('express');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Song, Album, Comment } = require('../../db/models');

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

// get all Comments by a Song's id

router.get('/', restoreUser, requireAuth, async (req, res) => {
  const AllComments = await Comment.findAll({
    where: {}
  })
  res.json(AllComments)
})
// create a Comment for a Song based on the Song's id

// edit a Comment

// delete a Comment
module.exports = router;
