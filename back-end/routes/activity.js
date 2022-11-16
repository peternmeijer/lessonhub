const express = require('express')
const router = express.Router()

//controllers
const {getActivity, createActivity, updateActivity, deleteActivity} = require('../controllers/activity')

//middleware
const {checkAccess, accountTypeGuard} = require("../middleware/accessVerification");

//routes
router.route("/").post(checkAccess, accountTypeGuard("Instructor"), createActivity);
router.route("/:id").get(checkAccess, accountTypeGuard("Instructor"), getActivity)
router.route("/:id").patch(checkAccess, accountTypeGuard("Instructor"), updateActivity);
router.route("/:id").delete(checkAccess, accountTypeGuard("Instructor"), deleteActivity);

module.exports = router;