import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    attemptDate: {
        type: Date,
        default: Date.now
    }
});

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
    attempts: {
        score: {
            type: Number,
            required: true
        },
        attemptDate: {
            type: Date,
            default: Date.now
        },
        attemptCout: {
            type: Number,
            default: 1
        }
    }
}, {
    collection: "grades"
});

export default gradeSchema
