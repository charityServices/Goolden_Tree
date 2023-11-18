const Donors = require("../Models/FinancialDonation");

const showNew = async (req, res) => {
    try {
        const donors = await Donors.find({ isCompleted: true });
        return res.json(donors);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    showNew
}