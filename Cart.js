// models/Cart.js
const { getDB } = require('../db');

function getCartCollection() {
  return getDB().collection('carts');
}

module.exports = { getCartCollection };
