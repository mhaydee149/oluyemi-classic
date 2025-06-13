require('dotenv').config();
const express = require('express'); 
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const emailRouter = require('./routes/email');
const paystackWebhookRouter = require('./routes/paystackWebhook');
const orderRoutes = require('./routes/orderRoutes');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', emailRouter);
app.use('/api/paystack', paystackWebhookRouter); // Mount Paystack webhook router
app.use('/api/orders', orderRoutes); // Mount order routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
