const express = require('express');
const router = express.Router();

// users controller
const {
    registerUser,
    getAllUsers,
    getUserDetails,
    deleteUser,
    updateUser,
    loginUser,
    logoutUser,
    getLoggedInUserDetails
} = require('../../controllers/userController');

const { isAuthenticatedUser } = require('../../middlewares/auth');

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser, getLoggedInUserDetails);

router.route('/users').get(getAllUsers);

router.route('/user/:id')
    .delete(deleteUser)
    .patch(updateUser);

router.route('/admin/user/:id').get(getUserDetails)

module.exports = router;