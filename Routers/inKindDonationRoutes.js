const express = require("express");
const router = express.Router();
const inKindDonationController = require("../Controllers/inKindDonationController");

router.get("/getAll", inKindDonationController.getAllInKindDonations);
router.get("/:donationId", inKindDonationController.getInKindDonationById);
router.post("/create/:id", inKindDonationController.imageActivity,inKindDonationController.createInKindDonation);

router.get('/:id/donations', inKindDonationController.getDonationsByDonorId);


module.exports = router;
