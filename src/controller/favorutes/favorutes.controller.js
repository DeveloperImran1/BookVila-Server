const { ObjectId } = require('mongodb');
const Books = require("../../models/Books");
const Favorutes = require('../../models/Favorutes');

const getMyFavorutes = async (req, res) => {
    const myEmail = req.params.myEmail;
    try {
        const result = await Favorutes.find({userEmail: myEmail})
        console.log(result)
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// add Favroute book
const addFavoruteBook = async(req, res)=> {
    const obj = req.body;
    console.log(obj);
    try{
        const result = await Favorutes.create(obj)
        console.log(result)
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

// add Favroute book
const deleteFavoruteBook = async(req, res)=> {
    const id = req.params.id;
    console.log(id);
    try{
        const result = await Favorutes.deleteOne({_id: new ObjectId(id)})
        console.log(result)
        res.status(200).json(result);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getMyFavorutes, addFavoruteBook, deleteFavoruteBook };