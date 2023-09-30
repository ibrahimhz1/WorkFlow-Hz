const express = require('express');
const router = express.Router()

// controllers functions
const { 
    getAllProjects, 
    createProject, 
    getProjectDetails, 
    getProjectsOfUser, 
    deleteProject,
    updateProject 
} = require('../../controllers/projectController');
const {getTasksofProject} = require('../../controllers/taskController')

router.route('/projects').post(getProjectsOfUser)
router.route('/project/new').post(createProject)
router.route('/project/:id')
    .get(getProjectDetails)
    .delete(deleteProject)
    .patch(updateProject)

router.route('/project/tasks').post(getTasksofProject)


// Admin
router.route('/admin/projects').get(getAllProjects)

module.exports = router;