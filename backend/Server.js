const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require('./config/db');

const userRoutes = require('./routes/userRoutes');
const organizerRoutes = require('./routes/organizerRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/user', userRoutes);
app.use('/organizer', organizerRoutes);
app.use('/admin', adminRoutes);

// Start server
app.listen(7000, () => {
  console.log("✅ Server running on port 7000");
});