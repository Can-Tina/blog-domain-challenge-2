const express = require("express");
const {
    createPost,
    getPosts
} = require("../controllers/post")

const router = express.Router();

router.post("/create", createPost);
router.get("/", getPosts)

module.exports = router;