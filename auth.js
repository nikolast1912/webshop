const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const users = db.collection('users');

  router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existing = await users.findOne({ username });
    if (existing) return res.status(400).send({ error: 'User already exists' });

    await users.insertOne({ username, password });
    res.send({ success: true });
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await users.findOne({ username, password });
    if (!user) return res.status(401).send({ error: 'Invalid credentials' });

    res.send({ success: true });
  });

  return router;
};
