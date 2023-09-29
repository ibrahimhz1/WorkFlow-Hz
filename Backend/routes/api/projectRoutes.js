const express = require('express');
const router = express.Router()

// controllers functions
const { getAllProjects, createProject, getProjectDetails, getProjectsOfUser } = require('../../controllers/projectController');

router.route('/projects').post(getProjectsOfUser)
router.route('/project/new').post(createProject)
router.route('/project/:id').get(getProjectDetails)

// Admin
router.route('/admin/projects').get(getAllProjects)

module.exports = router;