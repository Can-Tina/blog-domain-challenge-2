const express = require("express");
const {
    createUser
} = require('../controllers/user');

const router = express.Router();

router.post("/register", createUser);

module.exports = router;