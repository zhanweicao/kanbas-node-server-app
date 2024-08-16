import mongoose from "mongoose";

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
    questions: [
        {
            type: {
                type: String,
                enum: ['Multiple Choice', 'True/False', 'Fill in the Blank'],
                required: true
            },
            title: {
                type: String,
                required: true
            },
            points: {
                type: Number,
                required: true
            },
            questionText: {
                type: String,
                required: true
            },
            choices: [
                {
                    text: String,
                    correct: Boolean,
                }
            ],
            correctAnswer: String, // For True/False and Fill in the Blank
        }
    ],
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    published: {
        type: Boolean,
        default: false
    }
},
    { collection: "quizzes" }
);

export default quizSchema;
