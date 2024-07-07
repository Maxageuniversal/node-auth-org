// app/routes/organisation.routes.js

const express = require('express');
const router = express.Router();
const organisationController = require('../controllers/organisation.controller');

// Routes
router.get('/', organisationController.getAllOrganisations);
router.get('/:orgId', organisationController.getOrganisationById);
router.post('/', organisationController.createOrganisation);
router.post('/:orgId/users', organisationController.addUserToOrganisation);

module.exports = router;
