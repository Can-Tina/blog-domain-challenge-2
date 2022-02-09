const express = require("express");
const {
    createComment,
    updateComment
} = require('../controllers/comment');

const router = express.Router();

router.post("/create", createComment);

router.patch("/:id", updateComment)

module.exports = router;