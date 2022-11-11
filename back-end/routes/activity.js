const express = require('express')
const router = express.Router()

const {getActivity, createActivity, updateActivity, deleteActivity} = require('../controllers/activity')

router.route("/").post(createActivity);
router.route("/:id").get(getActivity)
router.route("/:id").patch(updateActivity);
router.route("/:id").delete(deleteActivity);

module.exports = router;