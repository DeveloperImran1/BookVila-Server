

const mongoose = require('mongoose');


const answerSchema = new mongoose.Schema({
    response: {
        type: String,
        required: true
    },
    answeredBy: {
        type: String,
        required: true
    },
    answeredDate: {
        type: Date,
        required: true
    }
});

const questionSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    questionedBy: {
        type: String,
        required: true
    },
    questionedDate: {
        type: Date,
        required: true
    },
    answer: {
        type: answerSchema,
        required: true
    }
});

const bookQuestionsSchema = new mongoose.Schema({
    bookID: {
        type: String,
        required: true
    },
    questions: {
        type: [questionSchema],
        required: true
    }
});

module.exports = mongoose.model('questions', bookQuestionsSchema);

