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

const getMyReviews = async (req, res) => {
    const email = req?.params?.email;
    try {
        const result = await Reviews.find({userEmail: email})
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getReview = async (req, res) => {
    const id = req?.params?.id;
    try {
        const result = await Reviews.find({bookId: id})
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// new review add 

const addNewReview = async (req, res) => {
    const id = req?.params?.id;
    const reviewObj = req?.body;
    try {
        const result = await Reviews.create(reviewObj)
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getAllReviews, getMyReviews, getReview, addNewReview };