require('dotenv').config(); // ✅ MUST be first

const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.log('MONGO_URI not set — skipping DB connection');
}

// API routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});