// backend/routes/api/playlist.js
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



module.exports = router;
