const { ObjectId } = require('mongodb');
const AddToCart = require('../../models/AddToCart');

const getMyAddToCart = async (req, res) => {
    const myEmail = req.params.myEmail;
    try {
        const result = await AddToCart.find({userEmail: myEmail})
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// add add to cart book
const addToCartBook = async(req, res)=> {
    const obj = req.body;
    try{
        const result = await AddToCart.create(obj)
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}


// delete cart book
const deleteCartBook = async(req, res)=> {
    const id = req.params.id;
    console.log(id);
    try{
        const result = await AddToCart.deleteOne({_id: new ObjectId(id)})
        console.log(result)
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getMyAddToCart, addToCartBook, deleteCartBook };