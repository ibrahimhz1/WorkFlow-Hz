const express = require('express');
const router = express.Router();

// controller functions import
const {
    createTask,             // ["admin", "founder", "projectManager", "teamLeader"]
    getAllTasks,            // ["admin", "founder"]
    getLabelsOfTask,        // ["admin", "founder", "projectManager", "teamLeader", "teamMember"]
    getTaskDetails,         // ["admin", "founder", "projectManager", "teamLeader", "teamMember"]
    getSubTaskOfTask,       // ["admin", "founder", "projectManager", "teamLeader", "teamMember"]
    getTasksCreatedByUser,  // ["admin", "founder", "projectManager", "teamLeader"]
    getTasksAssignedForUser,// ["admin", "founder", "projectManager", "teamLeader", "teamMember"]
    getAllUsersOfTask,      // ["admin", "founder", "projectManager", "teamLeader", "teamMember"]
    deleteTask,             // ["admin", "founder", "projectManager", "teamLeader"]
    updateTask              // ["admin", "founder", "projectManager", "teamLeader", "teamMember"]
} = require('../../controllers/taskController');

const {isAuthenticatedUser, authorizedRoles} = require('../../middlewares/auth');

// routes
router.route("/task").post(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader"), createTask)
router.route("/task/:id")
    .get(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader", "teamMember"), getTaskDetails)
    .delete(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader"), deleteTask)
    .patch(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader", "teamMember"), updateTask)

router.route("/task/labels").post(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader", "teamMember"), getLabelsOfTask)
router.route("/task/subTask").post(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader", "teamMember"), getSubTaskOfTask)
router.route("/tasks").get(isAuthenticatedUser, authorizedRoles("admin", "founder"), getAllTasks);
router.route("/tasks/created").post(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader"), getTasksCreatedByUser)
router.route("/tasks/assigned").post(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader", "teamMember"), getTasksAssignedForUser)
router.route("/task/users").post(isAuthenticatedUser, authorizedRoles("admin", "founder", "projectManager", "teamLeader", "teamMember"), getAllUsersOfTask)

module.exports = router;