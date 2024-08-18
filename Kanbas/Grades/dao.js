import Grade from "./model.js";
import Question from "../Questions/model.js";

// Function to create a grade and increment attempt count
export const createGrade = async (gradeData) => {
  try {
    // Find the latest grade for the same user and quiz
    const latestGrade = await Grade.findOne({
      user: gradeData.user,
      quiz: gradeData.quiz
    }).sort({ 'attempt.attemptCount': -1 });  // Find the most recent attempt

    console.log("Latest Grade:", latestGrade); // Add this log to debug

    // Determine the new attempt count
    let attemptCount = 1;
    if (latestGrade) {
      attemptCount = latestGrade.attempt.attemptCount + 1;
      console.log("New Attempt Count:", attemptCount); // Log new attempt count
    }

    // Create the new grade with the incremented attempt count
    const newGrade = new Grade({
      user: gradeData.user,
      quiz: gradeData.quiz,
      attempt: {
        score: gradeData.attempt.score,
        attemptCount: attemptCount,  // Correct spelling
        attemptDate: gradeData.attempt.attemptDate || Date.now()
      }
    });

    const savedGrade = await newGrade.save();
    console.log("Created Grade:", savedGrade); // Log the newly created grade
    return savedGrade;
  } catch (error) {
    console.error("Error creating grade:", error);
    throw error;
  }
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

// Function to grade an answer
export const gradeAnswer = async (answer) => {
  let points = 0;
  const promise = answer.map(ans => Question.findById(ans.question).exec());
  const questions = await Promise.all(promise);
  answer.forEach((ans, index) => {
    const { value } = ans;
    const question = questions[index].toObject();

    if (question.type === 'True/False') {
      points += question.trueFalseAnswer === value ? question.points : 0;
      return;
    }
    if (question.type === 'Multiple Choice') {
      const correctAnswer = question.choices.find(c => c.correct);
      points += correctAnswer.text === value ? question.points : 0;
      return;
    }
    if (question.type === 'Fill in the Blank') {
      points += question.fillInBlankAnswers.includes(value) ? question.points : 0;
      return;
    }
  });
  return points;
};
