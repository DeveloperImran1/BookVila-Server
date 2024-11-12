const Reviews = require("../../models/Reviews");

const getAllReviews = async (req, res) => {
    try {
        const result = await Reviews.find()
        console.log(result)
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllReviews };