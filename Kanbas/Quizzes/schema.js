import mongoose from "mongoose";
import Question from "../Questions/model.js"; 

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Untitled Quiz'
    },
    description: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['Graded Quiz', 'Practice Quiz', 'Graded Survey', 'Ungraded Survey'],
        default: 'Graded Quiz'
    },
    points: {
        type: Number,
        default: 0
    },
    assignmentGroup: {
        type: String,
        enum: ['Quiz', 'Exam', 'Assignment', 'Project'],
        default: 'Quiz'
    },
    shuffleAnswers: {
        type: Boolean,
        default: true
    },
    timeLimit: {
        type: Number,
        default: 20 // in minutes 
    },
    multipleAttempts: {
        type: Boolean,
        default: false
    },
    maxAttempts: {
        type: Number,
        default: 1
    },
    showCorrectAnswers: {
        type: Boolean,
        default: true
    },
    accessCode: {
        type: String,
        default: ''
    },
    oneQuestionAtATime: {
        type: Boolean,
        default: true
    },
    webcamRequired: {
        type: Boolean,
        default: false
    },
    lockQuestionsAfterAnswering: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        default: null
    },
    availableDate: {
        type: Date,
        default: null
    },
    untilDate: {
        type: Date,
        default: null
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    published: {
        type: Boolean,
        default: false
    }
}, {
    collection: "quizzes"
});

// Middleware to calculate the total points before saving the quiz
quizSchema.pre('save', async function(next) {
    const questions = await Question.find({ quiz: this._id });

    if (questions && questions.length > 0) {
        this.points = questions.reduce((sum, question) => sum + (question.points || 0), 0);
    } else {
        this.points = 0;
    }

    next();
});

export default quizSchema;
