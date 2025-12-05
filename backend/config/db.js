// MongoDB connection helper
// TODO: read MONGO_URI from env and export connect function

const mongoose = require('mongoose');

module.exports = function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecotracker';
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
};
