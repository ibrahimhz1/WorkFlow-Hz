const express = require('express');
const router = express.Router();

// users controller
const { 
    registerUser, 
    getAllUsers, 
    getUserDetails, 
    deleteUser,
    updateUser
} = require('../../controllers/userController');

router.route('/register').post(registerUser);
router.route('/users').get(getAllUsers);
router.route('/user/:id')
    .get(getUserDetails)
    .delete(deleteUser)
    .patch(updateUser)
    
module.exports = router;