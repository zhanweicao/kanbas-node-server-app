import * as dao from "./dao.js";

export default function QuizRoutes(app) {

    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        console.log(`Updating quiz with ID: ${qid}`, req.body); // Log the quiz ID and request body
        try {
            const status = await dao.updateQuiz(qid, req.body);
            res.json(status);
        } catch (error) {
            console.error("Error updating quiz:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.put("/api/courses/:cid/quizzes/:qid", updateQuiz);

    const deleteQuiz = async (req, res) => {
        const { qid } = req.params;
        console.log(`Deleting quiz with ID: ${qid}`); // Log the quiz ID
        try {
            const status = await dao.deleteQuiz(qid);
            res.json(status);
        } catch (error) {
            console.error("Error deleting quiz:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.delete("/api/courses/:cid/quizzes/:qid", deleteQuiz);

    const createQuiz = async (req, res) => {
        const { cid } = req.params; // Extract courseId from URL
        const quizData = req.body;
        quizData.course = cid; // Automatically assign courseId to the quiz

        console.log("Creating quiz with data:", quizData); // Log the data being created

        try {
            const quiz = await dao.createQuiz(quizData);
            res.json(quiz);
        } catch (error) {
            console.error("Error creating quiz:", error); // Log the error if creation fails
            res.status(500).json({ error: error.message });
        }
    };
    app.post("/api/courses/:cid/quizzes", createQuiz);

    const findQuizzesByCourseId = async (req, res) => {
        const { cid } = req.params;
        console.log(`Finding quizzes for course with ID: ${cid}`); // Log the course ID
        try {
            const quizzes = await dao.findQuizzesByCourseId(cid);
            res.json(quizzes);
        } catch (error) {
            console.error("Error finding quizzes:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.get("/api/courses/:cid/quizzes", findQuizzesByCourseId);

    const findQuizById = async (req, res) => {
        const { qid } = req.params;
        console.log(`Finding quiz with ID: ${qid}`); // Log the quiz ID
        try {
            const quiz = await dao.findQuizById(qid);
            if (quiz) {
                res.json(quiz);
            } else {
                res.status(404).json({ error: "Quiz not found" });
            }
        } catch (error) {
            console.error("Error finding quiz:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.get("/api/courses/:cid/quizzes/:qid", findQuizById);

}
