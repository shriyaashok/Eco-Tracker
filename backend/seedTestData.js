// Script to seed test data for development

const mongoose = require('mongoose');
const User = require('./models/User');
const Entry = require('./models/Entry');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecotracker';
const TEST_USER_ID = '675210a1b2c3d4e5f6789012';

async function seedData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Create test user
    const existingUser = await User.findById(TEST_USER_ID);
    if (!existingUser) {
      const user = new User({
        _id: TEST_USER_ID,
        email: 'test@ecotracker.com',
        name: 'Test User',
        lifetimeStats: {
          totalEmissions: 0,
          totalOffsets: 0,
          ecoPoints: 0,
          treesPlanted: 0,
          entriesLogged: 0
        }
      });
      await user.save();
      console.log('Test user created');
    } else {
      console.log('Test user already exists');
    }

    console.log('Seed data complete!');
    console.log(`User ID: ${TEST_USER_ID}`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seedData();
