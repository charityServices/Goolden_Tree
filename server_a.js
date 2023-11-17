const express = require('express');
const app = express();
const mongoose = require("mongoose")
const port = 5000;
const cors = require('cors');
require('dotenv').config(); 
const DB_URI = process.env.DB_URI
const activitiesRouter = require("./Routers/activitiesRouter")
const path = require("path")

// register view engine
app.set("view engine", "ejs");

// static files
app.use(express.static("public"));

// fetch me data from every request
app.use(express.urlencoded({ extended: true }));

app.use("/ActivitiesImages", express.static(path.join(__dirname, "ActivitiesImages")));

app.use(activitiesRouter)

mongoose.connect(DB_URI)
.then(() => {
  console.log("Connected Successfuly")
}).catch((error) => {
  console.log("error with connecting with the db", error)
})

app.use(express.json())
app.use(cors());
const n = 5
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

