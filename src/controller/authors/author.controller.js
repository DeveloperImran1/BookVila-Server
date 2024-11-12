const Authors = require("../../models/Authors");

const getAllAuthors = async (req, res) => {
    try {
        const result = await Authors.find()
        console.log(result)
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllAuthors };