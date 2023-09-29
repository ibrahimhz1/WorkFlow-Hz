const express = require('express');
const router = express.Router()

// controllers functions
const { getAllProjects, createProject, getProjectDetails } = require('../../controllers/projectController');

router.route('/projects').get(getAllProjects)
router.route('/project/new').post(createProject)
router.route('/project/:id').get(getProjectDetails)

module.exports = router;