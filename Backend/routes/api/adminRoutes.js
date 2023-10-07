const express = require('express');
const router = express.Router();

// ADMIN controllers
const { registerAdmin, loginAdmin, getLoggedInAdminProfile } = require('../../controllers/adminController');
const { isAuthenticatedUser, authorizedRoles } = require('../../middlewares/auth');

router.route('/admin/register').post(registerAdmin);
router.route('/admin/login').post(loginAdmin);
router.route('/admin/me').get(isAuthenticatedUser, authorizedRoles("admin"), getLoggedInAdminProfile);

module.exports = router;