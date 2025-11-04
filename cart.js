const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  const carts = db.collection('carts');

  // Save cart
  router.post('/cart/save', async (req, res) => {
    const { username, items } = req.body;
    await carts.updateOne(
      { username },
      { $set: { items } },
      { upsert: true }
    );
    res.send({ success: true });
  });

  // Load cart
  router.get('/cart/:username', async (req, res) => {
    const cart = await carts.findOne({ username: req.params.username });
    res.send(cart || { items: [] });
  });

  return router;
};