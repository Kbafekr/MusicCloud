// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


const validateSignup = [
  check('email')
  .exists({ checkFalsy: true })
  .isEmail()
  .withMessage('Please provide a valid email.'),
  check('username')
  .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
    check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


  let where = {};

// Sign up
router.post('/', validateSignup, async (req, res, next) => {
  const { username, firstName, lastName, email, password } = req.body;
    const errors = {}

  const emailInput = await User.findOne({ where : {email : email} })
  const usernameInput = await User.findOne({ where: {username : username} })
  if (emailInput) errors.emailInputError = "Email already in use"
  if (usernameInput) errors.usernameInputError = "Username already in use"

    errors.status = 403;
    res.json(errors)


  const user = await User.signup({ username, firstName, lastName, email, password });

  await setTokenCookie(res, user);

  return res.json({ user });
});


// find all users
router.get('/', async (req, res) => {
  const allUsers = await User.findAll({
      where,

  });
  res.json(allUsers);
});

//current user

router.get('/current', async (req, res) => {
  const allUsers = await User.findOne({
      where: {
        id: req.user.id
      }

  });
  res.json(allUsers);
});

module.exports = router;
