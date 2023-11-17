const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AreasAfforestedSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    alias: 'areaId',
  },
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor', 
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', 
    required: true,
  },
  placeName: {
    type: String,
    required: true,
  },
  areasLocation: {
    type: String,
    required: true,
  },
  treesPlanted: {
    type: Number,
    required: true,
  },
  datePlanted: {
    type: String,  
    required: true,
  },
  afforestedAreaImageName: {
    type: String,
    allowNull: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Afforested = mongoose.model("Afforested", AreasAfforestedSchema);
module.exports = Afforested;
