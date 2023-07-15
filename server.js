const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


//routes importing


const app = express();

dotenv.config(); // Load environment variables

const connectDB = require('./Config/db');

connectDB(); // Connect to MongoDB
app.use(express.json()); // for parsing application/json


app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(cors()); // Enable CORS




//             USERS
app.use('/user', require('./Routes/userRoutes'));
//             ADMIN
app.use('/admin', require('./Routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});