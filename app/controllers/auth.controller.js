// app/controllers/auth.controller.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const Organisation = require('../models/organisation.model');

// Handle user registration
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password, phone } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create default organisation
    const defaultOrgName = `${firstName}'s Organisation`;
    const organisation = await Organisation.create({
      name: defaultOrgName,
      description: `Default organisation for ${firstName}`,
    });

    // Create user
    const user = await User.create({
      userId: generateUserId(), // Implement your own function to generate userId
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    // Return success response
    const accessToken = generateAccessToken(user.userId);
    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Handle user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Generate and return JWT token
    const accessToken = generateAccessToken(user.userId);
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        accessToken,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to generate JWT token
function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Helper function to generate userId (implement your own logic)
function generateUserId() {
  // Implement your own logic to generate userId
  return 'user_' + Math.random().toString(36).substr(2, 9);
}
