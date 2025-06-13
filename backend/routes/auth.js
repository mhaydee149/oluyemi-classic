const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail'); // Make sure you have this util created
const rateLimit = require('express-rate-limit');

// Rate limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Input validation
  if (!name) {
    return res.status(400).json({ msg: 'Name is required' });
  }
  if (!email) {
    return res.status(400).json({ msg: 'Email is required' });
  }
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }
  if (!password) {
    return res.status(400).json({ msg: 'Password is required' });
  }
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ msg: 'Password must be at least 8 characters long' });
  }

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login
router.post('/login', authLimiter, async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email) {
    return res.status(400).json({ msg: 'Email is required' });
  }
  if (typeof email !== 'string') {
    return res.status(400).json({ msg: 'Invalid email format' });
  }
  if (!password) {
    return res.status(400).json({ msg: 'Password is required' });
  }
  if (typeof password !== 'string') {
    return res.status(400).json({ msg: 'Invalid password format' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ====================
// Forgot Password Route
// ====================
router.post('/forgot-password', authLimiter, async (req, res) => {
  const { email } = req.body;

  // Input validation
  if (!email) {
    return res.status(400).json({ msg: 'Email is required' });
  }
  if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User with this email does not exist' });

    // Generate a reset token (random string)
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Save token and expiration to user model (add these fields in your User schema!)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour expiry

    await user.save();

    // Create reset URL to send via email
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email content
    const message = `
      <h2>Password Reset Request</h2>
      <p>You requested to reset your password. Click the link below to set a new password:</p>
      <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
    `;

    // Send email using your sendEmail utility
    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html: message,
    });

    res.status(200).json({ msg: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ==================
// Reset Password Route
// ==================
router.post('/reset-password/:resetToken', authLimiter, async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  // Input validation
  if (!password) {
    return res.status(400).json({ msg: 'Password is required' });
  }
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ msg: 'Password must be at least 8 characters long' });
  }

  try {
    // Find user by reset token and check if token is not expired
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },  // token expiration check
    });

    if (!user) return res.status(400).json({ msg: 'Invalid or expired reset token' });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ msg: 'Password has been reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
