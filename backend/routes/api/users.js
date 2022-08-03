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

  //make a validation for login that passes error into handle validation errors



  let where = {};

// Sign up
router.post('/', validateSignup, async (req, res, next) => {

  const errorCode = {
    'title': "Forbidden: Username and/or email already exists",
    'statusCode': 403,
    'message': {}
  }

  const {firstName, lastName, email, username, password} = req.body;

  const EmailInput = await User.findOne({where: {email}});
  const UsernameInput = await User.findOne({where: {username}});

  if (EmailInput && UsernameInput) {
    errorCode.message = "Email and Username already associated with a user"
    return res.status(403).json(errorCode)
  }

  if (EmailInput) {
    errorCode.message = "Email already associated with a user"
    return res.status(403).json(errorCode)
  }

  if (UsernameInput) {
    errorCode.message = "Username already associated with a user"
    return res.status(403).json(errorCode)
  }

  const user = await User.signup({firstName, lastName, email, username, password });


  const token = setTokenCookie(res, user);

  user.token = token

  await user.save()

  return res.json({ user, token });
});

//current user

router.get('/current', requireAuth, async (req, res) => {
  const allUsers = await User.findOne({
      where: {
        id: req.user.id
      }

  });
  res.json(allUsers);
});

module.exports = router;
