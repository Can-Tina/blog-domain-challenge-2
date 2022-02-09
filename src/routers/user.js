const express = require("express");
const {
    createUser,
    updateUser
} = require('../controllers/user');

const router = express.Router();

router.post("/register", createUser);

router.patch("/:id", updateUser)

module.exports = router;
