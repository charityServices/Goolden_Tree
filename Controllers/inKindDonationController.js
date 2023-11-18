const InKindDonation = require("../Models/inKindDonationModel");
const IndividualDonor = require("../Models/DonorsUserSchema");
const OrganizationalDonor = require('../Models/DonorsOrgSchema');

const getAllInKindDonations = async (req, res) => {
  try {
    const inKindDonations = await InKindDonation.find();
    // res.json(inKindDonations);
    res.render('donationsCards' , {   
      inKindDonations
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getDonationsByDonorId = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Donor ID:", id);

    // Find all donations associated with the donor_id
    const donations = await InKindDonation.find({ donor_id: id });

    console.log("Found Donations:", donations);

    // Check if any donations were found
    if (donations.length === 0) {
      return res.status(404).json({ error: "No donations found for the donor" });
    }

    // Return the list of donations
    res.json(donations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getInKindDonationById = async (req, res) => {
  const { donationId } = req.params;
  try {
    const donation = await InKindDonation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ error: "In-kind donation not found" });
    }
    res.json(donation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createInKindDonation = async (req, res) => {
  const { item_type, description } = req.body;
  const { id } = req.params;

  try {
    // Check if the donor exists and determine the donor type based on the role field
    const individualDonor = await IndividualDonor.findOne({
      _id: id,
    });

    const organizationDonor = await OrganizationalDonor.findOne({
      _id: id,
    });

    if (!individualDonor && !organizationDonor) {
      // Handle the case where the donor is not found
      return res.status(404).json({ error: "Donor not found" });
    }

    if (individualDonor && individualDonor.role) {
      // Donor is an individual user
      const newDonation = new InKindDonation({
        donor_id: id,
        donor_type: individualDonor.role,
        item_type,
        description,
      });

      const savedDonation = await newDonation.save();
      return res.status(201).json(savedDonation);
    } else if (organizationDonor && organizationDonor.role) {
      // Donor is an organization
      const newDonation = new InKindDonation({
        donor_id: id,
        donor_type: organizationDonor.role,
        item_type,
        description,
      });

      const savedDonation = await newDonation.save();
      // return res.status(201).json(savedDonation);
      return res.redirect('http://localhost:5000/create')
    }

    // Donor's role is null
    return res.status(404).json({ error: "Donor's role is null" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// const renderDonationForm = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const donor = await getDonorById(id); // Assuming you have a method to get the donor by ID
//     res.render('donationForm', { donor });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

module.exports = {
  getAllInKindDonations,
  getInKindDonationById,
  createInKindDonation,
  getDonationsByDonorId,
  
  // renderDonationForm, 
  // Add other controller methods as needed
};


