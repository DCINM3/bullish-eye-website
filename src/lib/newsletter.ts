import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    await client.connect();
    const db = client.db('bullisheyes');
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export { client };
