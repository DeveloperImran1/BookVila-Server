const Questions = require("../../models/Questions");

const getSingleBookQuestion = async (req, res) => {
    const bookID = req.params.id;
    console.log(bookID)
    try {
        const result = await Questions.find({bookID})
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getSingleBookQuestion };