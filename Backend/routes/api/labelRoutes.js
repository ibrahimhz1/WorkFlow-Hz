const express = require('express');
const router = express.Router();

const {getAllLabels, createLabel} = require('../../controllers/labelController');

//routes
router.route('/labels').get(getAllLabels);
router.route('/label').post(createLabel);

module.exports = router;