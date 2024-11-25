const { default: mongoose } = require("mongoose");
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
const questionBookID = async (req, res) => {
    const bookID = req.params.bookID;// URL থেকে `bookID` সংগ্রহ
    try {
        // বইয়ের নির্দিষ্ট `bookID` ভিত্তিতে প্রশ্নগুলো ফিল্টার করুন
        const result = await Questions.aggregate([
            {
                $match: { bookID: bookID } // `bookID` মিলিয়ে ডেটা ফিল্টার
            },
            {
                $project: {
                    _id: 0, // `_id` দেখাবো না
                    bookID: 1, // বইয়ের `bookID` দেখাবো
                    questions: 1 // প্রশ্নগুলো দেখাবো
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No questions found for this bookID" });
        }

        // সফল হলে ফলাফল পাঠান
        res.status(200).json(result); // শুধু প্রথম ম্যাচ করা ডকুমেন্ট পাঠাব
    } catch (error) {
        console.error("Error fetching questions:", error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getSingleBookQuestion, questionBookID };