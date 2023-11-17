const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonorsUserSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    alias: 'userId',
  },
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
    allowNull: true,
  },
  imageName: {
    type: String,
    allowNull: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", DonorsUserSchema);

module.exports = User;
