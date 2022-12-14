const express = require('express')
const router = express.Router()

//controllers
const {getLesson, createLesson, updateLesson, getLessons, deleteLesson} = require('../controllers/lesson')

//middleware
const {checkAccess, accountTypeGuard} = require("../middleware/accessVerification");

//lesson sub-routes
router.route("/:id").get(checkAccess, accountTypeGuard("Instructor"), getLesson);
router.route("/").get(checkAccess, accountTypeGuard("Instructor"), getLessons);
router.route("/").post(checkAccess, accountTypeGuard("Instructor"), createLesson);
router.route("/:id").patch(checkAccess, accountTypeGuard("Instructor"), updateLesson);
router.route("/:id").delete(checkAccess, accountTypeGuard("Instructor"), deleteLesson);

module.exports = router;

