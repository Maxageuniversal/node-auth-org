// app/index.js

require('dotenv').config();

// Your application initialization code follows...
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const organisationRoutes = require('./routes/organisation.routes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(errorHandler);

// Routes
app.use('/auth', authRoutes);
app.use('/api/organisations', organisationRoutes);

// Sync Sequelize models with database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync database:', err);
  });
