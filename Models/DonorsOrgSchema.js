const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationalDonorSchema = new Schema({
  orgId: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'Org',
  },
  orgName: {
    type: String,
    required: true,
  },
  address: {
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

const OrganizationalDonor = mongoose.model('Donors', OrganizationalDonorSchema);

module.exports = OrganizationalDonor;
