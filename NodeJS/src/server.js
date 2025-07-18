
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ Load env variables only in non-production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const pollsRoutes = require('./routes/polls');
const app = express();

const PORT = process.env.PORT || 8001;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/polls', pollsRoutes);

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) =>
    console.error('❌ MongoDB connection error:', err)
  );
