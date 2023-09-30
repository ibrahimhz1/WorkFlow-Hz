const express = require('express');
const router = express.Router();

const {getAllLabels, createLabel, deleteLabel, updateLabel} = require('../../controllers/labelController');

//routes
router.route('/labels').get(getAllLabels);
router.route('/label').post(createLabel);
router.route('/label/:id')
    .delete(deleteLabel)
    .patch(updateLabel)

module.exports = router;