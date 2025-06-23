require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@mystorage.qtsriei.mongodb.net/bullisheyes?retryWrites=true&w=majority&appName=mystorage';

async function createSuperAdmin() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const adminsCollection = db.collection('admins');

    // Check if super admin already exists
    const existingAdmin = await adminsCollection.findOne({ email: 'admin@bullisheyes.com' });
    if (existingAdmin) {
      console.log('Super admin already exists');
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('Ashish123', 10);

    // Create super admin
    const superAdmin = {
      email: 'admin@bullisheyes.com',
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