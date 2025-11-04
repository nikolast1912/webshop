// db.js
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'iphoneShop';

let db;

async function connectDB() {
  await client.connect();
  console.log('✅ Connected to MongoDB');
  db = client.db(dbName);
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
