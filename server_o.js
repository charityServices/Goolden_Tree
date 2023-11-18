const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5000;
const cors = require('cors');
require('dotenv').config();
const path = require("path")

const DB_URI = process.env.DB_URI;

// Import routes
// const userRoutes = require('./routes/userRoutes');
// const organizationRoutes = require('./routes/organizationRoutes');
const inKindDonationRoutes = require('./Routers/inKindDonationRoutes');

// Register view engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Fetch data from every request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/InKindDonationsImages", express.static(path.join(__dirname, "InKindDonationsImages")));


// Connect to MongoDB
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
// app.use('/user', userRoutes);
// app.use('/organization', organizationRoutes);
app.use( inKindDonationRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
