const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pollsRoutes = require('./routes/polls');

const app = express();
const PORT = 8001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/polls', pollsRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/polling-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
})
.catch(err => console.error('❌ MongoDB connection error:', err));
