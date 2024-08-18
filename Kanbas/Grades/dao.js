import Grade from "./model.js";
import Question from "../Questions/model.js";

export const createGrade = (grade) => {
  delete grade._id;
  return Grade.create(grade);
};

export const findGradeById = (gradeId) => {
  return Grade.findById(gradeId);
};

export const findGradesByUserId = (userId) => {
  return Grade.find({ user: userId });
};

export const updateGrade = (gradeId, grade) => {
  return Grade.updateOne({ _id: gradeId }, { $set: grade });
};

export const deleteGrade = (gradeId) => {
  return Grade.deleteOne({ _id: gradeId });
};

export const gradeAnswer = async (answer) => {
  let points = 0
  const promise = answer.map(ans => Question.findById(ans.question).exec())
  const questions = await Promise.all(promise)
  answer.forEach((ans, index) => {
    const { value } = ans;
    const question = questions[index].toObject()
    // console.log(value, question)
    if (question.type === 'True/False') {
      // console.log(question.trueFalseAnswer, value)
      points += question.trueFalseAnswer === value ? question.points : 0
      return
    }
    if (question.type === 'Multiple Choice') {
      const correctAnswer = question.choices.find(c => c.correct)
      // console.log(correctAnswer, value)
      points += correctAnswer.text === value ? question.points : 0
      return
    }
    if (question.type === 'Fill in the Blank') {
      // console.log(question.fillInBlankAnswers, value)
      points += question.fillInBlankAnswers.includes(value) ? question.points : 0
      return
    }
    // console.log(points)
  });
  return points
};