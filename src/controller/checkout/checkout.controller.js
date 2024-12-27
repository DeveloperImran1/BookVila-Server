const { ObjectId } = require('mongodb');
const Checkout = require('../../models/Checkout');

const createPayment = async (req, res) => {
    console.log("create payment is hitt")
    try {
        res.status(200).json({res: "result"});
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}




module.exports = { createPayment };