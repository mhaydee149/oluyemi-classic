const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail'); // Import the utility

// Existing payment confirmation email route
router.post('/send-email', async (req, res) => {
  const { email, reference, products, date, amount } = req.body;

  if (!email || !reference || !products || !date || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const html = `
    <h2>Payment Successful</h2>
    <p>Thank you for your purchase.</p>
    <p><strong>Reference Number:</strong> ${reference}</p>
    <p><strong>Products:</strong> ${products}</p>
    <p><strong>Amount Paid:</strong> ₦${Number(amount).toLocaleString()}</p>
    <p><strong>Date:</strong> ${date}</p>
  `;

  try {
    await sendEmail({
      to: email,
      subject: 'Payment Confirmation',
      html: html,
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    res.status(500).json({ message: 'Failed to send payment confirmation email' });
  }
});

// New route for sending password reset email
router.post('/send-reset-password-email', async (req, res) => {
  const { email, resetUrl } = req.body;

  if (!email || !resetUrl) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const html = `
    <h2>Password Reset Request</h2>
    <p>You requested to reset your password.</p>
    <p>Click the link below to reset your password. This link is valid for 10 minutes.</p>
    <p><a href="${resetUrl}" clicktracking=off>${resetUrl}</a></p>
    <p>If you did not request this, please ignore this email.</p>
  `;
  // Note: Added clicktracking=off to the resetUrl link as it's good practice for password reset links.

  try {
    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      html: html,
    });
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Failed to send password reset email' });
  }
});

module.exports = router;
