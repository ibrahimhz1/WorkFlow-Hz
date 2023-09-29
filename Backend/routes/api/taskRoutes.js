const express = require('express');
const router = express.Router();

// controller functions import
const {createTask, getAllTasks} = require('../../controllers/taskController')

// routes
router.route("/task").post(createTask)
router.route("/tasks").get(getAllTasks)


module.exports = router;