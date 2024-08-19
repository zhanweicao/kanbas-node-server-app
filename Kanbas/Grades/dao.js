import Grade from "./model.js";
import Question from "../Questions/model.js";

// Function to create a grade and increment attempt count
export const createGrade = async (gradeData) => {
  try {

    const latestGrade = await Grade.findOne({
      user: gradeData.user,
      quiz: gradeData.quiz
    }).sort({ 'attempt.attemptCount': -1 });  // Find the most recent attempt

    console.log("Latest Grade:", latestGrade); // Add this log to debug


    let attemptCount = 1;
    if (latestGrade) {
      attemptCount = latestGrade.attempt.attemptCount + 1;
      console.log("New Attempt Count:", attemptCount); // Log new attempt count
    }


    const newGrade = new Grade({
      user: gradeData.user,
      quiz: gradeData.quiz,
      attempt: {
        score: gradeData.attempt.score,
        attemptCount: attemptCount,  
        attemptDate: gradeData.attempt.attemptDate || Date.now(),
        answers: gradeData.attempt.answers,
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
export const gradeAnswer = async (answers) => {
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
      console.error("Answers array is missing or empty");
      throw new Error("Answers array is missing or empty");
  }

  console.log("Grading answers:", answers); // Log the answers being graded

  let points = 0;
  const promise = answers.map(ans => Question.findById(ans.question).exec());
  const questions = await Promise.all(promise);
  
  answers.forEach((ans, index) => {
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
export const findLatestGradeForQuiz = async (quizId, userId) => {
  return Grade.findOne({ quiz: quizId, user: userId }).sort({ 'attempt.attemptCount': -1 });
};
