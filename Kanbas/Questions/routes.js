import * as dao from "./dao.js"; // Assuming you have a DAO for questions

export default function QuestionRoutes(app) {

    const updateQuestion = async (req, res) => {
        const { questionId } = req.params; 
        console.log(`Updating question with ID: ${questionId}`, req.body); 
        try {
            const status = await dao.updateQuestion(questionId, req.body);
            res.json(status);
        } catch (error) {
            console.error("Error updating question:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.put("/api/courses/:cid/quizzes/:qid/questions/:questionId", updateQuestion);
    

    const deleteQuestion = async (req, res) => {
        const { questionId } = req.params;
        console.log(`Deleting question with ID: ${questionId}`); // Log the question ID
        try {
            const status = await dao.deleteQuestion(questionId);
            res.json(status);
        } catch (error) {
            console.error("Error deleting question:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.delete("/api/courses/:cid/quizzes/:qid/questions/:questionId", deleteQuestion);

    const createQuestion = async (req, res) => {
        const { qid } = req.params; // Extract quizId from URL
        const questionData = req.body;
        questionData.quiz = qid; // Automatically assign quizId to the question

        console.log("Creating question with data:", questionData); // Log the data being created

        try {
            const question = await dao.createQuestion(questionData);
            res.json(question);
        } catch (error) {
            console.error("Error creating question:", error); // Log the error if creation fails
            res.status(500).json({ error: error.message });
        }
    };
    app.post("/api/courses/:cid/quizzes/:qid/questions", createQuestion);

    const findQuestionsByQuizId = async (req, res) => {
        const { qid } = req.params;
        console.log(`Finding questions for quiz with ID: ${qid}`); // Log the quiz ID
        try {
            const questions = await dao.findQuestionsByQuizId(qid);
            res.json(questions);
        } catch (error) {
            console.error("Error finding questions:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.get("/api/courses/:cid/quizzes/:qid/questions", findQuestionsByQuizId);

    const findQuestionById = async (req, res) => {
        const { questionId } = req.params;
        console.log(`Finding question with ID: ${questionId}`); // Log the question ID
        try {
            const question = await dao.findQuestionById(questionId);
            if (question) {
                res.json(question);
            } else {
                res.status(404).json({ error: "Question not found" });
            }
        } catch (error) {
            console.error("Error finding question:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.get("/api/courses/:cid/quizzes/:qid/questions/:questionId", findQuestionById);

}
