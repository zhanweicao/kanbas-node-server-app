import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Multiple Choice', 'True/False', 'Fill in the Blank'],
        required: true,
        default: 'Multiple Choice'
    },
    title: {
        type: String,
        required: true,
        default: 'Untitled Question'
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    questionText: {
        type: String,
        required: true,
        default: 'New Question Text'
    },
    choices: [
        {
            text: String,
            correct: Boolean,
        }
    ],
    trueFalseAnswer: Boolean, // For True/False questions
    fillInBlankAnswers: [String], // For Fill in the Blank questions
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    order: Number
}, {
    collection: "questions"
});

export default questionSchema;