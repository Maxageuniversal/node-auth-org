// app/controllers/organisation.controller.js

const Organisation = require('../models/organisation.model');

// Get all organisations
exports.getAllOrganisations = async (req, res) => {
  try {
    const organisations = await Organisation.findAll();
    res.status(200).json({
      status: 'success',
      message: 'Retrieved all organisations',
      data: { organisations },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get organisation by ID
exports.getOrganisationById = async (req, res) => {
  try {
    const { orgId } = req.params;
    const organisation = await Organisation.findByPk(orgId);
    if (!organisation) {
      return res.status(404).json({ message: 'Organisation not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Retrieved organisation',
      data: organisation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new organisation
exports.createOrganisation = async (req, res) => {
  try {
    const { name, description } = req.body;
    const organisation = await Organisation.create({ name, description });
    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: organisation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add user to organisation
exports.addUserToOrganisation = async (req, res) => {
  try {
    const { orgId } = req.params;
    const { userId } = req.body;

    // Implement logic to add user to organisation
    // Example: Update user model to associate with organisation

    res.status(200).json({
      status: 'success',
      message: 'User added to organisation successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
