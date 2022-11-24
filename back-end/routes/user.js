const express = require('express')
const router = express.Router()

//controllers
const {loginUser, registerUser, createUser, logoutUser} = require('../controllers/user')

//middleware
const {checkAccess, accountTypeGuard} = require("../middleware/accessVerification");

//user sub-routes
router.route("/login").post(loginUser);
router.route("/logout").post(checkAccess, logoutUser);
router.route("/register/:token").post(registerUser);
router.route("/create").post(checkAccess, accountTypeGuard("Administrator"), createUser);

module.exports = router;