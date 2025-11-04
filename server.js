const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const url = 'mongodb://localhost:27017';
const dbName = 'iphoneShop';
const client = new MongoClient(url);

async function startServer() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(dbName);

    // ✅ Initialize routes AFTER connection
    const authRoutes = require('./routes/auth')(db);
    const cartRoutes = require('./routes/cart')(db);

    app.use('/api', authRoutes);
    app.use('/api', cartRoutes);

    app.listen(4000, () => {
      console.log('🚀 Server is running on http://localhost:4000');
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
  }
}

startServer(); // ✅ Correct function call
