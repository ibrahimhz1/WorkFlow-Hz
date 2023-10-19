const express = require('express');
const router = express.Router();

// controllers functions
const {
    getAllProjects,
    createProject,
    getProjectDetails,
    getProjectsOfUser,
    deleteProject,
    updateProject,
    getProjectsOfOrg,
    getAllMembersOfProject,
    updateMembersOfProject
} = require('../../controllers/projectController');

const { isAuthenticatedUser, authorizedRoles } = require('../../middlewares/auth');

router.route('/projects').post(isAuthenticatedUser, authorizedRoles("admin", "founder"), getProjectsOfUser);

router.route("/project/new").post(isAuthenticatedUser, authorizedRoles("admin", "founder"), createProject);

router.route('/project/:id')
    .get(isAuthenticatedUser, authorizedRoles("admin", "projectManager", "founder", "teamLeader", "teamMember"), getProjectDetails)
    .delete(isAuthenticatedUser, authorizedRoles("admin", "founder"), deleteProject)
    .patch(isAuthenticatedUser, authorizedRoles("admin", "founder"), updateProject);

router.route('/project/members').post(isAuthenticatedUser, authorizedRoles("admin", "projectManager", "founder", "teamLeader", "teamMember"), getAllMembersOfProject)

router.route('/project/updateMembers').put(isAuthenticatedUser, authorizedRoles("projectManager"), updateMembersOfProject);

router.route("/org/projects").post(isAuthenticatedUser, authorizedRoles("admin", "founder"), getProjectsOfOrg);

// Admin
router.route('/projects').get(isAuthenticatedUser, authorizedRoles("admin", "founder"), getAllProjects);

module.exports = router;