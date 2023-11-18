// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const DonorsSchema = new Schema({
//     title: {
//         type: String,
//         allowNull: true
//     },
//     details: {
//         type: String,
//         allowNull: true,
//     },
//     DonationAmount: {
//         type: Number,
//         allowNull: true,
//     },
//     Date: {
//         type: String,
//         allowNull: true,
//     },
//     image: {
//         type: String,
//         allowNull: true,
//     },
//     isDeleted: {
//         type: Boolean,
//         default: false,
//     },
// });

// const Donors = mongoose.model("FinancialDonation", DonorsSchema);

// module.exports = Donors;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonorsSchema = new Schema({
    title: {
        type: String,
        allowNull: true
    },
    details: {
        type: String,
        allowNull: true,
    },
    DonationAmount: {
        type: Number,
        allowNull: true,
    },
    Date: {
        type: String,
        allowNull: true,
    },
    image: {
        type: String,
        allowNull: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    maxDonationAmount: {
        type: Number,
        required: true,
    },
    currentDonationAmount: {
        type: Number,
        default: 0,
    },
    expirationTime: {
        type: Date,
        required: true,
    },
});

const Donors = mongoose.model("FinancialDonation", DonorsSchema);

module.exports = Donors;
