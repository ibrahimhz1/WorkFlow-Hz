const express = require('express');
const router = express.Router();

// controller function
const {getOrganisations} = require('../../controllers/organisationController.js')
// routes

router.route('/organisations').get(getOrganisations);

module.exports = router;