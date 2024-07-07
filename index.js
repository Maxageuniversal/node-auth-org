// index.js
require('dotenv').config(); // Load .env file

const express = require('express');
const app = express();
const errorHandler = require('./app/middleware/errorHandler');
const authRoutes = require('./app/routes/auth.routes');
const sequelize = require('./config/database');

// Middleware
app.use(express.json());
app.use('/auth', authRoutes);

// Test DB connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.error('Unable to connect to the database:', err));

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
