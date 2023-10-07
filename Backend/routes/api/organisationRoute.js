const express = require('express');
const router = express.Router();

// controller function
const { createOrg, getAllOrg, deleteOrg, updateOrg } = require('../../controllers/organisationController')
const { isAuthenticatedUser, authorizedRoles } = require('../../middlewares/auth');

// routes
router.route('/org')
    .post(isAuthenticatedUser, authorizedRoles("founder", "admin"), createOrg)
    .delete(isAuthenticatedUser, authorizedRoles("founder", "admin"), deleteOrg)
    .patch(isAuthenticatedUser, authorizedRoles("founder", "admin"), updateOrg);

router.route('/orgs').get(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader", "teamMember" ), getAllOrg);

module.exports = router;
