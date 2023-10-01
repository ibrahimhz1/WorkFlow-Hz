const express = require('express');
const router = express.Router()

// controllers functions
const { 
    getAllProjects, 
    createProject, 
    getProjectDetails, 
    getProjectsOfUser, 
    deleteProject,
    updateProject, 
    getAllUsersOfProject
} = require('../../controllers/projectController');
const {getTasksofProject} = require('../../controllers/taskController')

router.route('/projects').post(getProjectsOfUser)
router.route('/project/new').post(createProject)
router.route('/project/:id')
    .get(getProjectDetails)
    .delete(deleteProject)
    .patch(updateProject)

router.route('/project/tasks').post(getTasksofProject)
router.route('/project/users').post(getAllUsersOfProject)

// Admin
router.route('/admin/projects').get(getAllProjects)

module.exports = router;