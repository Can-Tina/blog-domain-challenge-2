const express = require("express");
const {
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user');

const router = express.Router();

router.post("/register", createUser);

router.patch("/:id", updateUser)

router.delete("/:id", deleteUser)

module.exports = router;
