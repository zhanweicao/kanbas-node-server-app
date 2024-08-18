import Question from './model.js';
import Quiz from '../Quizzes/model.js';

// Function to update quiz points based on associated questions
const updateQuizPoints = async (quizId) => {
    const questions = await Question.find({ quiz: quizId });
    const totalPoints = questions.reduce((sum, question) => sum + question.points, 0);
    await Quiz.updateOne({ _id: quizId }, { $set: { points: totalPoints } });
};

export const createQuestion = async (question) => {
    delete question._id;
    const newQuestion = await Question.create(question);
    await updateQuizPoints(newQuestion.quiz); // Update quiz points after creating a question
    return newQuestion;
};

export const findQuestionById = (questionId) => {
    return Question.findById(questionId);
}

export const findQuestionsByQuizId = (quizId) => {
    return Question.find({ quiz: quizId });
}

export const updateQuestion = async (questionId, question) => {
    const updatedQuestion = await Question.updateOne({ _id: questionId }, { $set: question });
    await updateQuizPoints(question.quiz); // Update quiz points after updating a question
    return updatedQuestion;
};

export const deleteQuestion = async (questionId) => {
    const question = await Question.findByIdAndDelete(questionId);
    if (question) {
        await updateQuizPoints(question.quiz); // Update quiz points after deleting a question
    }
    return question;
};