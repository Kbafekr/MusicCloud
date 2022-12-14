// backend/routes/api/songs.js
const { singlePublicFileUpload, multipleFileKeysUpload } = require("../../awsS3");

const express = require("express");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const {
  User,
  Song,
  Album,
  Comment,
  playlist,
  Genre,
} = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { route } = require("./comments");
const e = require("express");

const router = express.Router();

const { Op } = require("sequelize");

const SongValidation = [
  check("title")
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Song title must be at least two characters."),
  check("description")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a valid description"),
  check("url")
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage("Username cannot be an email."),
  handleValidationErrors,
];

const validateComment = [
  check("body")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("body must be at least one character and be present"),
  handleValidationErrors,
];

//  if ((!Number.isInteger(page) || page <= 0) || (!Number.isInteger(size) || size <= 0) ) {
//      const errors = {
//        'title': "Error retrieving songs with query parameters",
//        'statusCode': 400,
//        'errors': {}
//      }

//       if (!Number.isInteger(page) || page <= 0) {
//         errors.errors.page = "Page value in query must be a number greater than 0"
//         }

//       if (!Number.isInteger(size) || size <= 0) {
//         errors.errors.size = "size value in query must be a number greater than 0"
//       }

//       if (!Number.isInteger(size) || size <= 0) {
//         errors.errors.size = "size value in query must be a number greater than 0"
//       }

//      res.status(400).json(errors)
//    }
const QuerySearchValidation = [
  check("title")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Song title must be longer than one character"),
  check("createdAt")
    .isLength({ min: 24 })
    .optional()
    .withMessage(
      'please provide a valid date (example format: "2022-08-08T14:30:34.959Z")'
    ),
  check("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page must be a number greater than 0"),
  check("size")
    .optional()
    .isInt({ min: 1 })
    .withMessage("size must be a number greater than 0"),
  handleValidationErrors,
];

//add query filters to get all songs

//get all songs
router.get(
  "/",
  restoreUser,
  requireAuth,
  QuerySearchValidation,
  async (req, res) => {
    let { page, size, title, createdAt } = req.query;
    let where = {};

    if (title) where.title = title;

    if (createdAt) where.createdAt = createdAt;

    page = parseInt(page);
    size = parseInt(size);

    if (!page || page > 10) page = 1;
    if (!size || size > 20) size = 120;

    let pagination = {};

    pagination.limit = size;
    pagination.offset = size * (page - 1);

    const allSongs = await Song.findAll({
      where: { ...where },
      include: [
        {
          model: User,
          as: "Artist",
          attributes: ["id", "username", "imageUrl"],
        },
        { model: Album, attributes: ["id", "title", "imageUrl"] },
        { model: Genre, attributes: ["id", "songId", "userId", "genre"] },
      ],
      ...pagination,
    });

    if (!allSongs) {
      const errors = {
        title: "Error retrieving songs",
        statusCode: 404,
        message: {},
      };

      errors.message = "Songs could not be found with requested parameters";
      res.status(404).json(errors);
    }
    const response = {
      Songs: allSongs,
      page: page,
      size: size,
    };
    res.json(response);
  }
);
//add query filters to get all songs

//get all songs
router.get("/Demo", restoreUser, QuerySearchValidation, async (req, res) => {
  let { page, size, title, createdAt } = req.query;
  let where = {};

  if (title) where.title = title;

  if (createdAt) where.createdAt = createdAt;

  page = parseInt(page);
  size = parseInt(size);

  if (!page || page > 10) page = 1;
  if (!size || size > 20) size = 100;

  let pagination = {};

  pagination.limit = size;
  pagination.offset = size * (page - 1);

  const allSongs = await Song.findAll({
    where: { ...where },
    include: [
      { model: User, as: "Artist", attributes: ["id", "username", "imageUrl"] },
      { model: Album, attributes: ["id", "title", "imageUrl"] },
      { model: Genre, attributes: ["id", "songId", "userId", "genre"] },
    ],
    ...pagination,
  });

  if (!allSongs) {
    const errors = {
      title: "Error retrieving songs",
      statusCode: 404,
      message: {},
    };

    errors.message = "Songs could not be found with requested parameters";
    res.status(404).json(errors);
  }
  const response = {
    Songs: allSongs,
    page: page,
    size: size,
  };
  res.json(response);
});

//get all songs created by the current User

router.get("/current", restoreUser, requireAuth, async (req, res) => {
  const user = req.user.id;
  const userSongs = await Song.findAll({
    where: {
      userId: user,
    },
  });

  const response = {
    Songs: userSongs,
  };
  res.json(response);
});

//get song details by Id

router.get("/:songid", restoreUser, requireAuth, async (req, res) => {
  const theSong = await Song.findOne({
    where: {
      id: req.params.songid,
    },
    include: [
      { model: User, as: "Artist", attributes: ["id", "username", "imageUrl"] },
      { model: Album, attributes: ["id", "title", "imageUrl"] },
      { model: Genre, attributes: ["id", "songId", "userId", "genre"] },
    ],
  });

  if (!theSong) {
    const errors = {
      title: "Error retrieving song",
      statusCode: 404,
      message: {},
    };

    errors.message = "Song does not exist/could not be found with requested id";
    res.status(404).json(errors);
  }

  return res.json(theSong);
});

//api docs say they can be created without album id
//create a song for an album based on albums id

router.post(
  "/",
  multipleFileKeysUpload([
    { name: "url", maxCount: 1 },
    { name: "imageUrl", maxCount: 1 },
  ]),
  restoreUser,
  requireAuth,
  async (req, res) => {
    let { title, description, url, imageUrl, albumId } = req.body;
    const user = req.user;
    const userId = req.user.id;
    const album = await Album.findOne({
      where: {
        id: albumId,
      },
    });

    if (!album) {
      const errors = {
        title: "Error retrieving album",
        statusCode: 404,
        message: {},
      };
      errors.message =
        "Album does not exist/could not be found with requested id";
      return res.status(404).json(errors);
    }

    if (userId !== album.userId) {
      const errors = {
        title: "Error authenticating user",
        statusCode: 403,
        message: {},
      };
      errors.message = "Album does not belong to current user";
      return res.status(403).json(errors);
    }

    if (req.files.url) {
      url = await singlePublicFileUpload(req.files.url[0]);
    }
    if (req.files.imageUrl) {
      imageUrl = await singlePublicFileUpload(req.files.imageUrl[0]);
    }

    const newSong = await Song.create({
      userId: userId,
      albumId: albumId,
      title: title,
      description: description,
      url: url,
      imageUrl:
        imageUrl ||
        "https://cdn.pixabay.com/photo/2018/08/27/10/11/radio-cassette-3634616__480.png",
    });
    return res.status(201).json(newSong);
  }
);

//edit song

router.put(
  "/:id",
  restoreUser,
  requireAuth,
  SongValidation,
  async (req, res) => {
    const { title, description, url, imageUrl } = req.body;
    const userId = req.user.id;
    const Id = req.params.id;

    const editSong = await Song.findOne({
      where: {
        id: Id,
      },
    });

    if (!editSong) {
      const errors = {
        title: "Error retrieving song",
        statusCode: 404,
        message: {},
      };
      errors.message =
        "Song does not exist/could not be found with requested id";
      return res.status(404).json(errors);
    }

    if (editSong.userId !== userId) {
      const errors = {
        title: "Error authenticating user",
        statusCode: 403,
        message: {},
      };
      errors.message = "Album does not belong to current user";
      return res.status(403).json(errors);
    }

    if (title) {
      editSong.title = title;
    }
    if (description) {
      editSong.description = description;
    }
    if (url) {
      editSong.url = url;
    }
    if (url) {
      editSong.imageUrl = imageUrl;
    }

    await editSong.save();
    return res.status(200).json(editSong);
  }
);

//delete a song

router.delete("/:id", requireAuth, restoreUser, async (req, res) => {
  const userId = req.user.id;
  const deleteSong = await Song.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!deleteSong) {
    const errors = {
      title: "Song couldn't be found",
      statusCode: 404,
      message: {},
    };

    errors.message =
      "Song does not exist, could not be found with requested id";
    return res.status(404).json(errors);
  }

  if (userId !== deleteSong.userId) {
    const errors = {
      title: "Error authenticating user",
      statusCode: 403,
      message: {},
    };
    errors.message = "Comment does not belong to current user";
    return res.status(403).json(errors);
  }

  await deleteSong.destroy();
  const success = {
    message: "song successfully deleted",
    statusCode: "200",
  };
  res.status(200).json(success);
});

// get all Comments by a Song's id

router.get("/:songId/comments", restoreUser, requireAuth, async (req, res) => {
  const SongId = req.params.songId;

  const Comments = await Comment.findAll({
    where: { songId: SongId },
    include: [{ model: User, attributes: ["id", "username", "imageUrl"] }],
  });

  if (!Comments) {
    const errors = {
      title: "Error retrieving song comments",
      statusCode: 404,
      message: {},
    };

    errors.message =
      "Song does not exist, associated comments could not be found with requested id";
    return res.status(404).json(errors);
  }
  const response = {
    Comments: Comments,
  };
  return res.json(response);
});

//create a comment for a song based on Song's id

router.post(
  "/:songId/comments",
  restoreUser,
  requireAuth,
  validateComment,
  async (req, res) => {
    const SongId = req.params.songId;
    const UserId = req.user.id;
    const { body } = req.body;

    const findSong = await Song.findByPk(SongId);

    if (!findSong) {
      const errors = {
        title: "Error retrieving song comments",
        statusCode: 404,
        message: {},
      };

      errors.message =
        "Song does not exist, associated comments could not be found with requested id";
      return res.status(404).json(errors);
    }

    const comment = await Comment.create({
      userId: UserId,
      songId: SongId,
      body: body,
    });
    return res.json(comment);
  }
);

// genre

// get all genre by a Song's id

router.get("/:songId/genre", restoreUser, requireAuth, async (req, res) => {
  const SongId = req.params.songId;

  const Genre = await Genre.findAll({
    where: { songId: SongId },
    include: [
      { model: User, attributes: ["id", "username", "imageUrl"] },
      {
        model: Song,
        attributes: [
          "id",
          "userId",
          "albumId",
          "title",
          "description",
          "url",
          "createdAt",
          "updatedAt",
          "imageUrl",
        ],
      },
    ],
  });

  if (!Genre) {
    const errors = {
      title: "Error retrieving song genre",
      statusCode: 404,
      message: {},
    };

    errors.message =
      "Song does not exist, associated comments could not be found with requested id";
    return res.status(404).json(errors);
  }
  const response = {
    Comments: Comments,
  };
  return res.json(response);
});

//create a comment for a song based on Song's id

router.post(
  "/:songId/Genre",
  restoreUser,
  requireAuth,
  validateComment,
  async (req, res) => {
    const SongId = req.params.songId;
    const UserId = req.user.id;
    const { body } = req.body;

    const findSong = await Song.findByPk(SongId);

    if (!findSong) {
      const errors = {
        title: "Error retrieving song genre",
        statusCode: 404,
        message: {},
      };

      errors.message =
        "Song does not exist, associated genre could not be found with requested id";
      return res.status(404).json(errors);
    }

    const genre = await Genre.create({
      userId: UserId,
      songId: SongId,
      genre: genre,
    });
    return res.json(genre);
  }
);

module.exports = router;
