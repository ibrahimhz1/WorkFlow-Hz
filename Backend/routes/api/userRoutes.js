const express = require('express');
const router = express.Router();

// users controller
const {
    registerUser,           // ["admin", "founder", "projectManager"]
    getAllUsers,            // ["admin", "founder"]
    getUserDetails,         // ["admin", "founder", "projectManager", "teamLeader", "teamMember"]
    deleteUser,             // ["admin", "founder", "projectManager"]
    updateUser,             // ["admin", "founder", "projectManager"]
    loginUser,              
    logoutUser,             
    getLoggedInUserDetails,  // ["admin", "founder", "projectManager", "teamLeader", "teamMember"]
    getProjectManagersOfOrg,
    getAllFounders,
    getAllProjectManagers,
    getAllTeamLeaders,
    getAllTeamMembers
    
} = require('../../controllers/userController');

const { isAuthenticatedUser, authorizedRoles } = require('../../middlewares/auth');

router.route('/register').post(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager"), registerUser);

router.route('/login').post(loginUser);

router.route("/logout").get(isAuthenticatedUser, logoutUser);
// router.route("/logout").post(logoutUser);

router.route("/me").get(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader", "teamMember"), getLoggedInUserDetails);

router.route('/users').get(isAuthenticatedUser, authorizedRoles("admin", "founder"), getAllUsers);

router.route('/user/:id')
    .delete(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager"), deleteUser)
    .patch(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager"), updateUser);

router.route('/user/:id').get(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader", "teamMember"), getUserDetails);

router.route('/org/projectManagers').post(isAuthenticatedUser, authorizedRoles("admin", "founder"), getProjectManagersOfOrg);



router.route('/allFounders').get(isAuthenticatedUser, authorizedRoles("root", "admin"), getAllFounders);
router.route('/allProjectManagers').get(isAuthenticatedUser, authorizedRoles("root", "admin", "founder"), getAllProjectManagers);
router.route('/allTeamLeaders').get(isAuthenticatedUser, authorizedRoles("root", "admin", "founder", "projectManager"), getAllTeamLeaders);
router.route('/allTeamMembers').get(isAuthenticatedUser, authorizedRoles("root", "admin", "founder", "projectManager"), getAllTeamMembers);

module.exports = router;