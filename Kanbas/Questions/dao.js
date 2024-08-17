import Question from './model.js';

export const createQuestion = (question) => {
    delete question._id;
    return Question.create(question);
}

export const findQuestionById = (questionId) => {
    return Question.findById(questionId);
}

export const findQuestionsByQuizId = (quizId) => {
    return Question.find({ quiz: quizId });
}

export const updateQuestion = (questionId, question) => {
    return  Question.updateOne({ _id: questionId }, { $set: question });
}

export const deleteQuestion = (questionId) => {
    return Question.deleteOne({ _id: questionId });
}