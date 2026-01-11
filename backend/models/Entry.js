const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  userId: {
    type: String, // Changed from ObjectId to String for Firebase compatibility
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['vehicle', 'plastic', 'energy', 'plantation'],
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  co2Emissions: {
    type: Number,
    default: 0,
    min: 0
  },
  co2Offset: {
    type: Number,
    default: 0,
    min: 0
  },
  ecoPointsEarned: {
    type: Number,
    default: 0,
    min: 0
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

EntrySchema.index({ userId: 1, date: -1 });
EntrySchema.index({ userId: 1, type: 1 });

module.exports = mongoose.model('Entry', EntrySchema);
