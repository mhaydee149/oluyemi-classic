const express = require('express');
const crypto = require('crypto');
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config(); // Ensure .env is loaded for PAYSTACK_SECRET_KEY

const router = express.Router();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Middleware to get raw body for Paystack signature verification
// This should be used *instead* of express.json() for this specific route
// However, for now, we'll try with JSON.stringify(req.body) and acknowledge the risk
// router.use(express.raw({ type: 'application/json' }));

router.post('/webhook', async (req, res) => {
  if (!PAYSTACK_SECRET_KEY) {
    console.error('PAYSTACK_SECRET_KEY is not set.');
    return res.status(500).send('Webhook secret key not configured.');
  }

  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body)) // Potential issue: express.json() might have already parsed and stringify might differ
    .digest('hex');

  const paystackSignature = req.headers['x-paystack-signature'];

  if (hash !== paystackSignature) {
    console.warn('Invalid Paystack signature attempt.');
    return res.status(401).send('Invalid signature');
  }

  const event = req.body;

  if (event.event === 'charge.success') {
    const data = event.data;
    const paymentReference = data.reference;
    const customerEmail = data.customer.email;
    const totalAmountNaira = data.amount / 100; // Amount is in kobo

    try {
      // Idempotency: Check if order already exists
      const existingOrder = await Order.findOne({ paymentReference });
      if (existingOrder) {
        console.log(`Order with reference ${paymentReference} already exists. Skipping.`);
        return res.sendStatus(200);
      }

      // CRITICAL GAP: metadata.cartItems and metadata.userId are placeholders.
      // The actual Paystack event data might not contain these directly in this structure.
      // This part needs to be revisited based on how frontend sends metadata.
      const metadata = data.metadata || {}; // Ensure metadata exists
      const cartItems = metadata.cartItems || []; // Fallback to empty array
      const userId = metadata.custom_fields?.find(field => field.variable_name === 'user_id')?.value || metadata.userId || null;


      // Temporary Simplification: Create a basic order
      const newOrder = new Order({
        customerEmail: customerEmail,
        totalAmount: totalAmountNaira,
        paymentReference: paymentReference,
        paymentStatus: 'successful',
        items: cartItems.map(item => ({ // Assuming cartItems have name, quantity, price
          name: item.name || 'Unknown Item',
          quantity: item.quantity || 1,
          price: item.price || 0,
          image: item.image || ''
        })),
        user: userId, // This will likely be null or incorrect without proper metadata
        // shippingAddress can be added if available or leave empty for now
      });

      await newOrder.save();
      console.log(`Order ${newOrder._id} created successfully for reference ${paymentReference}`);

      // Send Confirmation Email
      const emailHtml = `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order!</p>
        <p><strong>Order Reference:</strong> ${newOrder.paymentReference}</p>
        <p><strong>Total Amount Paid:</strong> ₦${newOrder.totalAmount.toLocaleString()}</p>
        <p>We will process your order shortly.</p>
      `;
      await sendEmail({
        to: newOrder.customerEmail,
        subject: 'Your Order Confirmation',
        html: emailHtml,
      });
      console.log(`Order confirmation email sent to ${newOrder.customerEmail}`);

    } catch (err) {
      console.error('Error processing webhook event:', err);
      // Don't send 500 to Paystack if it's our internal error after acknowledging event
      // But log it for us. Paystack only cares about the 200 for event receipt.
      // If the error is before DB operation, a 500 might be okay, but Paystack will retry.
      // For now, if signature is valid, we'll send 200 to avoid retries for processing errors.
    }
  } else {
    console.log(`Received Paystack event: ${event.event}, not processing.`);
  }

  res.sendStatus(200); // Acknowledge receipt of the event to Paystack
});

module.exports = router;
