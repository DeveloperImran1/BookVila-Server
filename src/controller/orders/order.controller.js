const { ObjectId } = require('mongodb');
const Order = require('../../models/Orders');

const getAllOrder = async (req, res) => {
    try {
        const result = await Order.find()
        console.log(result)
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getMyOrder = async (req, res) => {
    const myEmail = req.params.myEmail;
    try {
        const result = await Order.find({"user.email": myEmail})
        console.log(result)
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// create new order
const createNewOrder = async (req, res) => {
    const newOrder = req.body;
    console.log(newOrder)
    try {
        const result = await Order.create(newOrder)
        console.log(result)
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = { getAllOrder, getMyOrder, createNewOrder };