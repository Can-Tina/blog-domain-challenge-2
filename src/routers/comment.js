const express = require("express");
const {
    createComment,
    updateComment,
    deleteComment
} = require('../controllers/comment');

const router = express.Router();

router.post("/create", createComment);

router.patch("/:id", updateComment)

router.delete("/:id", deleteComment)

module.exports = router;