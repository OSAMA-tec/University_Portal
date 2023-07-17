const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');




const app = express();

dotenv.config(); 

const connectDB = require('./Config/db');

connectDB(); // Connect to MongoDB
app.use(express.json()); 


app.use(express.json());
app.use(cors()); 




//             USERS
app.use('/user', require('./Routes/userRoutes'));
//             ADMIN
app.use('/admin', require('./Routes/adminRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});