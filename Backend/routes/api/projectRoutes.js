const express = require('express');
const router = express.Router()

// controllers functions
const { getAllProjects, createProject, getProjectDetails, getProjectsOfUser } = require('../../controllers/projectController');
const {getTasksofProject} = require('../../controllers/taskController')

router.route('/projects').post(getProjectsOfUser)
router.route('/project/new').post(createProject)
router.route('/project/:id').get(getProjectDetails)
router.route('/project/tasks').post(getTasksofProject)

// Admin
router.route('/admin/projects').get(getAllProjects)

module.exports = router;