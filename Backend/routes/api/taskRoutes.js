const express = require('express');
const router = express.Router();

// controller functions import
const {createTask, getAllTasks, getLabelsOfTask, getTaskDetails, getSubTaskOfTask, getTasksCreatedByUser, getTasksAssignedForUser} = require('../../controllers/taskController')

// routes
router.route("/task").post(createTask)
router.route("/task/:id").get(getTaskDetails)
router.route("/task/labels").post(getLabelsOfTask)
router.route("/task/subTask").post(getSubTaskOfTask)
router.route("/tasks").get(getAllTasks)
router.route("/tasks/created").post(getTasksCreatedByUser)
router.route("/tasks/assigned").post(getTasksAssignedForUser)

module.exports = router;