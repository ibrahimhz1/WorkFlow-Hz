const express = require('express');
const router = express.Router();

// users controller
const { registerUser, getAllUsers, getUserDetails } = require('../../controllers/userController');

router.route('/register').post(registerUser);
router.route('/users').get(getAllUsers);
router.route('/user/:id').get(getUserDetails);

module.exports = router;