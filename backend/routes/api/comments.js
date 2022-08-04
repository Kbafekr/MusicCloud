// backend/routes/api/comments.js
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

// edit a Comment

router.put('/:commentId', restoreUser, requireAuth, async (req, res) => {
  const CommentId = req.params.commentId
  const userId = req.user.id
  const {body} = req.body
  let CommentEdit = await Comment.findByPk(CommentId)

  if (!CommentEdit) {
    const errors = {
      'title': "Error retrieving comments",
      'statusCode': 404,
      'message': {}
    }

    errors.message = "Comment does not exist, associated comments could not be found with requested id"
    return res.status(404).json(errors)
  }

  if (userId !== CommentEdit.userId) {
    const errors = {
      'title': "Error authenticating user",
      'statusCode': 403,
      'message': {}
    }
    errors.message = "Comment does not belong to current user"
    return res.status(403).json(errors)
  }

  if (body) {CommentEdit.body = body }
      await CommentEdit.save()

  return res.status(201).json(CommentEdit)
})
// delete a Comment

router.delete('/:commentid', requireAuth, restoreUser, async (req, res) => {
const CommentId = req.params.commentid
const userId = req.user.id


  const deleteComment = await Comment.findOne({
      where: {
          id: CommentId
      }
  })

  if (!deleteComment) {
    const errors = {
      'title': "Error retrieving Comment",
      'statusCode': 404,
      'message': {}
    }

    errors.message = "Comment does not exist, could not be found with requested id"
    return res.status(404).json(errors)
  }

  if (userId !== deleteComment.userId) {
    const errors = {
      'title': "Error authenticating user",
      'statusCode': 403,
      'message': {}
    }
    errors.message = "Comment does not belong to current user"
    return res.status(403).json(errors)
  }

  await deleteComment.destroy()
  const success = {
    'message': 'Comment successfully deleted',
    'statusCode': '200'
  }
  res.status(200).json(success)
})










module.exports = router;
