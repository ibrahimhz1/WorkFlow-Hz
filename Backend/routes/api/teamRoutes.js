const express = require('express');
const router = express.Router();

const { createTeam, updateTeam, deleteTeam, getAllTeams, getTeamsOfProject } = require('../../controllers/teamController');

const { isAuthenticatedUser, authorizedRoles } = require('../../middlewares/auth');

router.route('/team/new').post(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager"), createTeam)

router.route('/team').post(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager"), updateTeam);

router.route('/team/:id').delete(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager"), deleteTeam);

router.route('/teams').get(isAuthenticatedUser, authorizedRoles("admin", "founder"), getAllTeams);

router.route('/project/teams').post(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager"), getTeamsOfProject);

module.exports = router;