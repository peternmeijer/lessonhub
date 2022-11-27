const express = require('express')
const router = express.Router()

//controllers
const {getLesson, createLesson, updateLesson, getLessons} = require('../controllers/lesson')

//middleware
const {checkAccess, accountTypeGuard} = require("../middleware/accessVerification");

//lesson sub-routes
router.route("/:id").get(checkAccess, accountTypeGuard("Instructor"), getLesson);
router.route("/").get(checkAccess, accountTypeGuard("Instructor"), getLessons);
router.route("/").post(checkAccess, accountTypeGuard("Instructor"), createLesson);
router.route("/:id").patch(checkAccess, accountTypeGuard("Instructor"), updateLesson);

module.exports = router;

