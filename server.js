const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const connectDB = require('./Config/db');

connectDB(); // Connect to MongoDB

const app = express();

app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(cors()); // Enable CORS

// Define your routes here
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/admins', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});