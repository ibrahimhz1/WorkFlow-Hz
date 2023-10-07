const express = require('express');
const router = express.Router();

const {getAllLabels, createLabel, getLabelsOfProject, deleteLabel, updateLabel} = require('../../controllers/labelController');
const { isAuthenticatedUser } = require('../../middlewares/auth');

//routes
router.route('/labels').get(isAuthenticatedUser, getAllLabels);
router.route('/label').post(isAuthenticatedUser, createLabel);
router.route('/label/:id')
    .delete(isAuthenticatedUser, deleteLabel)
    .patch(isAuthenticatedUser, updateLabel)

router.route('/labels/project').post(isAuthenticatedUser, getLabelsOfProject);

module.exports = router;