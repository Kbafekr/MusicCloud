// backend/routes/index.js
const express = require('express');
const router = express.Router();
const app = require('../app');
//require api folder router
const apiRouter = require('./api');
router.use('/api', apiRouter);
//adds XSRF-TOKEN Cookie to router
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

module.exports = router;