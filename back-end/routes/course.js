const express = require('express')
const router = express.Router()

//controllers
const {getCourse, createCourse, updateCourse, deleteCourse, getCourses} = require('../controllers/course')

//middleware
const {checkAccess, accountTypeGuard} = require("../middleware/accessVerification");

//activity sub-routes
router.route("/").post(checkAccess, accountTypeGuard("Instructor"), createCourse);
router.route("/:id").get(checkAccess, getCourse)
router.route("/").get(checkAccess, getCourses);
router.route("/:id").patch(checkAccess, accountTypeGuard("Instructor"), updateCourse);
router.route("/:id").delete(checkAccess, accountTypeGuard("Instructor"), deleteCourse);

module.exports = router;