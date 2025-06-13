const jwt = require('jsonwebtoken');
const User = require('../models/User'); // To optionally check if the user still exists
require('dotenv').config(); // To access process.env.JWT_SECRET

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set. Authentication middleware cannot function.');
    return res.status(500).json({ msg: 'Server configuration error: JWT secret missing.' });
  }

  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied (no Authorization header)' });
  }

  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
    return res.status(401).json({ msg: 'Token format is "Bearer <token>", authorization denied' });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // decoded should contain { id: userId, ... } as signed in auth.js

    // Optional: Check if user still exists in DB and is active
    // This adds an extra DB query per authenticated request but ensures user validity.
    // For this task, we'll include it for robustness.
    const user = await User.findById(decoded.id);
    if (!user) {
      // console.log(`User with id ${decoded.id} not found in DB.`);
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }
    // If you add an `isActive` field to your User model, you could check it here:
    // if (!user.isActive) {
    //   return res.status(401).json({ msg: 'User is not active, authorization denied' });
    // }
    // req.user = user; // If you want to attach the full user object from DB

    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Token is not valid (JsonWebTokenError)' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token is expired' });
    }
    res.status(401).json({ msg: 'Token is not valid (general error)' });
  }
};

module.exports = authMiddleware;
