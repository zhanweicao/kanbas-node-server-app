import Quiz from "./model.js";

export const createQuiz = (quiz) => {
    delete quiz._id;
    return Quiz.create(quiz);
};

export const findQuizById = (quizId) => {
    return Quiz.findById(quizId);
};

export const findQuizzesByCourseId = (courseId) => {
    return Quiz.find({ course: courseId });
};

export const updateQuiz = (quizId, quiz) => {
    return Quiz.updateOne({ _id: quizId }, { $set: quiz });
};

export const deleteQuiz = (quizId) => {
    return Quiz.deleteOne({ _id: quizId });
};
