require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@cluster0.qgfscb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = process.env.DB_NAME || 'bullisheyes';

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI not found in .env file');
  process.exit(1);
}

async function createSuperAdmin() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(DB_NAME);
    const adminsCollection = db.collection('admins');

    // Check if super admin already exists
    const existingAdmin = await adminsCollection.findOne({ email: '<username>@gmail.com' });
    if (existingAdmin) {
      console.log('Super admin already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('<password>', 10);

    // Create super admin
    const superAdmin = {
      email: 'kumarashish98526@gmail.com',
      password: hashedPassword,
      name: 'Ashish Kumar',
      role: 'super_admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await adminsCollection.insertOne(superAdmin);
    console.log('Super admin created successfully');

  } catch (error) {
    console.error('Error creating super admin:', error);
  } finally {
    await client.close();
  }
}

// Run the script
createSuperAdmin(); 