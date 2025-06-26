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

      // Extract data from Paystack event
      const metadata = data.metadata || {}; // Metadata sent from frontend
      const { userId, cartItems, customerEmail: customerEmailFromMetadata } = metadata;

      // Use customer email from metadata if available, otherwise from Paystack customer object
      const finalCustomerEmail = customerEmailFromMetadata || customerEmail;

      const newOrderData = {
        user: userId, // userId from metadata (should be valid due to protected checkout route)
        customerEmail: finalCustomerEmail,
        items: cartItems && Array.isArray(cartItems) ? cartItems.map(item => ({
          name: item.name || 'N/A',
          quantity: item.quantity || 1,
          price: item.price || 0,
          image: item.image || '', // Assuming image might be part of cart item data
          productId: item.productId || null // Assuming productId is passed
        })) : [],
        totalAmount: totalAmountNaira,
        paymentReference: paymentReference,
        paymentStatus: 'successful',
        // shippingAddress can be added if available in metadata
      };

      // The 'user' field is required in the Order model.
      // If userId is null or undefined here, Mongoose will throw a validation error on save,
      // which is the desired behavior if the frontend somehow fails to send a valid userId
      // despite the checkout process being protected.

      const newOrder = new Order(newOrderData);
      await newOrder.save();
      console.log(`Order ${newOrder._id} created successfully for reference ${paymentReference}`);

      // Send Enhanced Confirmation Email
      let itemsHtml = '<ul>';
      if (newOrder.items && newOrder.items.length > 0) {
        newOrder.items.forEach(item => {
          itemsHtml += `<li>${item.name} - Qty: ${item.quantity} @ ₦${item.price.toLocaleString()}</li>`;
        });
      } else {
        itemsHtml += '<li>Details of items are being processed.</li>'; // Fallback
      }
      itemsHtml += '</ul>';

      const emailHtml = `
        <h2>Order Confirmation</h2>
        <p>Dear Customer,</p>
        <p>Thank you for your order! We are pleased to confirm that your payment has been successful.</p>
        <p><strong>Order Reference:</strong> ${newOrder.paymentReference}</p>
        <p><strong>Total Amount Paid:</strong> ₦${newOrder.totalAmount.toLocaleString()}</p>
        <p><strong>Order Date:</strong> ${new Date(newOrder.orderDate).toLocaleString()}</p>
        <h3>Items Purchased:</h3>
        ${itemsHtml}
        <p>Your order will be processed shortly. You can view your order details in your account on our website.</p>
        <p>Thank you for shopping with us!</p>
      `;
      await sendEmail({
        to: newOrder.customerEmail,
        subject: 'Your Order Confirmation - Payment Successful',
        html: emailHtml,
      });
      console.log(`Order confirmation email sent to ${newOrder.customerEmail}`);

    } catch (err) {
      console.error('Error processing charge.success webhook event:', err);
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
