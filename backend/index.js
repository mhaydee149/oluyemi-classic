const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
// ... existing imports
const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Test Route
app.get('/', (req, res) => {
  res.send('Backend running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
