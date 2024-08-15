import * as dao from "./dao.js";

export default function QuizRoutes(app) {

    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.updateQuiz(qid, req.body);
        res.json(status);
    };
    app.put("/api/courses/:cid/quizzes/:qid", updateQuiz);

    const deleteQuiz = async (req, res) => {
        const { qid } = req.params;
        const status = await dao.deleteQuiz(qid);
        res.json(status);
    };
    app.delete("/api/courses/:cid/quizzes/:qid", deleteQuiz);

    const createQuiz = async (req, res) => {
        const { cid } = req.params; // Extract courseId from URL
        const quizData = req.body;
        quizData.course = cid; // Automatically assign courseId to the quiz
        try {
            const quiz = await dao.createQuiz(quizData);
            res.json(quiz);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    app.post("/api/courses/:cid/quizzes", createQuiz);

    const findQuizzesByCourseId = async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesByCourseId(cid);
        res.json(quizzes);
    };
    app.get("/api/courses/:cid/quizzes", findQuizzesByCourseId);

    const findQuizById = async (req, res) => {
        const { qid } = req.params;
        const quiz = await dao.findQuizById(qid);
        if (quiz) {
            res.json(quiz);
        } else {
            res.status(404).json({ error: "Quiz not found" });
        }
    };
    app.get("/api/courses/:cid/quizzes/:qid", findQuizById);

}
