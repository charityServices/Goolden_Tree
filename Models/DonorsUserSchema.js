// For Individual Donors
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IndividualDonorSchema = new Schema({
  role: {
    type: String,
    required: true,
    default: "user",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  imageName: {
    type: String,
    default: null,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const IndividualDonor = mongoose.model("User", IndividualDonorSchema);

module.exports = IndividualDonor;
