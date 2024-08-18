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
        // answer: [{
        //   question: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'questionModel'
        //   }, 
        //   value: String | Boolean
        // }],
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
        }
    }
}, {
    collection: "grades"
});

export default gradeSchema