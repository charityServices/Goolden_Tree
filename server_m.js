const express = require('express');

const app = express();

const mongoose = require("mongoose");

const port = 5000;

const session = require("express-session");

const passport = require("passport");

const cors = require('cors');

require('dotenv').config();

const DB_URI = process.env.DB_URI;
//AY
const activitiesRouter = require("./Routers/activitiesRouter");
const AreasAfforestedRouter = require("./Routers/AreasAfforestedRouter");
const AreasWillAfforestedRouter = require("./Routers/AreasWillAfforestedRouter");
const path = require("path");
const Afforested = require("./Models/AreasAfforested");
const WillAfforested = require("./Models/AreasWillAfforested");
const Activities = require("./Models/Activities");
const Donors = require("./Models/FinancialDonation");
const paymentRouter = require("./Routers/paymentRouter");
//
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

app.use(passport.initialize());

app.use(passport.session());

// register view engine
app.set("view engine", "ejs");

// static files
app.use(express.static("public"));

// fetch me data from every request
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URI)
  .then(() => {
    console.log("Connected Successfuly")
  }).catch((error) => {
    console.log("error with connecting with the db", error)
  })

app.use(express.json())
app.use(cors());

const DonUserRoute = require('./Routers/DonUser-routes');

const DonOrgRoute = require('./Routers/DonOrg-routes');

const BenOrgRoute = require('./Routers/BenOrg-routes');

const ContactUs = require('./Routers/ContactUs-routes');

const FinancialDonation = require('./Routers/FinancialDonation-routes');

const newAchieve = require('./Routers/new-routes');

const OAuthRoute = require('./Routers/OAuth_routes');

app.post('/create-payment-intent', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});

app.get("/about", (request, response) => {
  response.render("about", { title: "About" });
});

app.get("/success", (request, response) => {
  response.render("success", { title: "Success" });
});

app.use(DonUserRoute);

app.use(DonOrgRoute);

app.use(BenOrgRoute);

app.use(OAuthRoute);

app.use(ContactUs);

app.use(FinancialDonation);
app.use(paymentRouter);

app.use(newAchieve);


//AY

app.use("/UserImage", express.static(path.join(__dirname, "UserImage")));
app.use("/ActivitiesImages", express.static(path.join(__dirname, "ActivitiesImages")));
app.use("/AreasAfforestedImages", express.static(path.join(__dirname, "AreasAfforestedImages")));
app.use("/AreasWillAfforestedImages", express.static(path.join(__dirname, "AreasWillAfforestedImages")));

app.use(activitiesRouter)
app.use(AreasAfforestedRouter)
app.use(AreasWillAfforestedRouter)
//


//! Ejs Areas Afforested 
app.get("/", async (req, res) => {
  try {
    const areasAfforested = await Afforested.find({ isCompleted: true });
    // const areasAfforested = await Donors.find({ isCompleted: true });

    const willAfforested = await Afforested.find({ isCompleted: false , InWork : true });

    const money = await Afforested.find({ isCompleted: false , InWork : false });

    const areasAfforestedWithImages = areasAfforested.map((area) => ({
      ...area.toJSON(),
      image_url: `http://localhost:5000/AreasAfforestedImages/${area.afforestedAreaImageName}`,
    }));

    const areasAfforestedWithImages2 = willAfforested.map((area) => ({
      ...area.toJSON(),
      image_url: `http://localhost:5000/AreasAfforestedImages/${area.afforestedAreaImageName}`,
    }));

    const areasAfforestedWithImages3 = money.map((area) => ({
      ...area.toJSON(),
      image_url: `http://localhost:5000/AreasAfforestedImages/${area.afforestedAreaImageName}`,
    }));

    // const areasWillAfforestedWithImages = areasAfforested.map((area) => ({
    //   ...area.toJSON(),
    //   image_url: `http://localhost:5000/AreasWillAfforestedImages/${area.willAfforestedAreaImageName}`,
    // }));


    const activities = await Activities.find({ isDeleted: false });

    const activitiesWithImages = activities.map((activity) => ({
      ...activity.toJSON(),
      image_url: `http://localhost:5000/ActivitiesImages/${activity.activitiesImageName}`,
    }));

    res.render("home", {
      AreasAfforested: areasAfforestedWithImages,
      AreasAfforested2: areasAfforestedWithImages2,
      AreasAfforested3: areasAfforestedWithImages3,
      // WillAfforestedAreas: areasWillAfforestedWithImages,
      Activities: activitiesWithImages,
      // donors: donorsWithImages
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


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

