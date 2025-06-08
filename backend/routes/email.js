const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Existing payment confirmation email route
router.post('/send-email', async (req, res) => {
  const { email, reference, products, date, amount } = req.body;

  if (!email || !reference || !products || !date || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const mailOptions = {
    from: `"Your Store" <${EMAIL_USER}>`,
    to: email,
    subject: 'Payment Confirmation',
    html: `
      <h2>Payment Successful</h2>
      <p>Thank you for your purchase.</p>
      <p><strong>Reference Number:</strong> ${reference}</p>
      <p><strong>Products:</strong> ${products}</p>
      <p><strong>Amount Paid:</strong> ₦${Number(amount).toLocaleString()}</p>
      <p><strong>Date:</strong> ${date}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

// New route for sending password reset email
router.post('/send-reset-password-email', async (req, res) => {
  const { email, resetUrl } = req.body;

  if (!email || !resetUrl) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const mailOptions = {
    from: `"Your Store" <${EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h2>Password Reset Request</h2>
      <p>You requested to reset your password.</p>
      <p>Click the link below to reset your password. This link is valid for 10 minutes.</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Failed to send password reset email' });
  }
});

module.exports = router;
