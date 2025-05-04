const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/zkAuthDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const connectDB = require('./db');
connectDB(); // Initialize DB connection
 

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});