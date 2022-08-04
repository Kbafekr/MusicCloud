// backend/routes/api/index.js
const express = require('express')
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs')
const albumsRouter = require('./albums')
const commentRouter = require('./comments')
const artistRouter = require('./artists')
const playlistRouter = require('./playlist')
const { restoreUser } = require("../../utils/auth.js")



// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter );
router.use('/albums', albumsRouter);
router.use('/comments', commentRouter);
router.use('/artists', artistRouter);
router.use('/playlists', playlistRouter)

// test route in api router
router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

  module.exports = router;
