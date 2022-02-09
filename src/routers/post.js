const express = require("express");
const {
    createPost,
    getPosts,
    updatePost
} = require("../controllers/post")

const router = express.Router();

router.post("/create", createPost);

router.get("/", getPosts)
router.get("/?number=:number", getPosts)
router.get("/?user=:user", getPosts)
router.get("/?order=:order", getPosts)

router.patch("/:id", updatePost)

module.exports = router;