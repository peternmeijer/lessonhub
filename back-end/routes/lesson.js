const express = require('express')
const router = express.Router()

const {getLesson, createLesson, updateLesson} = require('../controllers/lesson')


router.route("/:id").get(getLesson);
router.route("/").post(createLesson);
router.route("/:id").patch(updateLesson);

module.exports = router;

