const express = require('express')
const router = express.Router()

const {getLesson, createLesson} = require('../controllers/lesson')


router.route("/:id").get(getLesson);
router.route("/").post(createLesson);

module.exports = router;

