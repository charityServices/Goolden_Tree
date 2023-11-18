const express = require('express');
const app = express();
const mongoose = require("mongoose")
const port = 5000;
const cors = require('cors');
require('dotenv').config(); 
const DB_URI = process.env.DB_URI
const activitiesRouter = require("./Routers/activitiesRouter")
const AreasAfforestedRouter = require("./Routers/AreasAfforestedRouter")
const AreasWillAfforestedRouter = require("./Routers/AreasWillAfforestedRouter")
const path = require("path")
const Afforested = require("./Models/AreasAfforested")
const WillAfforested = require("./Models/AreasWillAfforested")
const Activities = require("./Models/Activities")


// register view engine
app.set("view engine", "ejs");

// static files
app.use(express.static("public"));

// fetch me data from every request
app.use(express.urlencoded({ extended: true }));

app.use("/ActivitiesImages", express.static(path.join(__dirname, "ActivitiesImages")));
app.use("/AreasAfforestedImages", express.static(path.join(__dirname, "AreasAfforestedImages")));
app.use("/AreasWillAfforestedImages", express.static(path.join(__dirname, "AreasWillAfforestedImages")));

app.use(activitiesRouter)
app.use(AreasAfforestedRouter)
app.use(AreasWillAfforestedRouter)

mongoose.connect(DB_URI)
.then(() => {
  console.log("Connected Successfuly")
}).catch((error) => {
  console.log("error with connecting with the db", error)
})

//! Ejs Areas Afforested 
app.get("/", async (req, res) => {
  try {
    const areasAfforested = await Afforested.find({ isDeleted: false });
    const willAfforested = await WillAfforested.find({ isDeleted: false });

    const areasAfforestedWithImages = areasAfforested.map((area) => ({
      ...area.toJSON(),
      image_url: `http://localhost:5000/AreasAfforestedImages/${area.afforestedAreaImageName}`,
    }));

    const areasWillAfforestedWithImages = willAfforested.map((area) => ({
      ...area.toJSON(),
      image_url: `http://localhost:5000/AreasWillAfforestedImages/${area.willAfforestedAreaImageName}`,
    }));

    const activities = await Activities.find({ isDeleted: false });

    const activitiesWithImages = activities.map((activity) => ({
      ...activity.toJSON(),
      image_url: `http://localhost:5000/ActivitiesImages/${activity.activitiesImageName}`,
    }));

    res.render("home", {
      AreasAfforested: areasAfforestedWithImages,
      WillAfforestedAreas: areasWillAfforestedWithImages,
      Activities: activitiesWithImages,
    });
  } catch (error) {
    console.error("Error occurred while fetching data:", error);
    // Handle the error and send an appropriate response
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching data",
      error: error.message,
    });
  }
});

app.use(express.json())
app.use(cors());
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

