const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const connectDB = require('./db');
connectDB(); // Initialize DB connection
 
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/zkAuthDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));