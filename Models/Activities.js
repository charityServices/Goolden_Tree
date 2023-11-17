const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunityActivitiesSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    alias: 'activityId',
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
  activityName: {
    type: String,
    required: true,
  },
  activityDescription: {
    type: String,
    required: true,
  },
  activityDate: {
    type: String, 
    required: true,
  },
  activitiesImageName: {
    type: String,
    allowNull: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Activities = mongoose.model("Activities", CommunityActivitiesSchema);
module.exports = Activities;
