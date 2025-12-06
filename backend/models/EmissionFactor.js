// Admin-managed emission factor schema
// TODO: allow admin to update emission factors used in calculations

const mongoose = require('mongoose');

const EmissionFactorSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Object, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmissionFactor', EmissionFactorSchema);
