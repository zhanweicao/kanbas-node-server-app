import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quizModel',
        required: true
    },
    attempt: {
        score: {
            type: Number,
            required: true
        },
        attemptDate: {
            type: Date,
            default: Date.now
        },
        attemptCount: {
            type: Number,
            default: 1
        },
        answers: [{
            question: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Question', // Link to the Question schema
                required: true
            },
            value: mongoose.Schema.Types.Mixed // Can be String (for text answers) or Boolean (for true/false)
        }],
    }
}, {
    collection: "grades"
});

export default gradeSchema