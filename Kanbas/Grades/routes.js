import * as dao from "./dao.js";
import Grade from "./model.js";

export default function GradeRoutes(app) {

    const updateGrade = async (req, res) => {
        const { gid } = req.params;
        console.log(`Updating grade with ID: ${gid}`, req.body); // Log the grade ID and request body
        try {
            const status = await dao.updateGrade(gid, req.body);
            res.json(status);
        } catch (error) {
            console.error("Error updating grade:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.put("/api/courses/:cid/quiz/:qid/grades/:gid", updateGrade);

    const deleteGrade = async (req, res) => {
        const { gid } = req.params;
        console.log(`Deleting grade with ID: ${gid}`); // Log the grade ID
        try {
            const status = await dao.deleteGrade(gid);
            res.json(status);
        } catch (error) {
            console.error("Error deleting grade:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.delete("/api/courses/:cid/grades/:gid", deleteGrade);

    const createGrade = async (req, res) => {
        const user = req.session?.currentUser?._id;
        const { qid } = req.params; // Extract quiz ID from URL
        const answers = req.body.answers; // Extract answers from the request body
        
        console.log("Received answers:", answers); // Log received answers
    
        if (!answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: "Answers array is missing or invalid" });
        }
    
        const score = await dao.gradeAnswer(answers); // Calculate the score
    
        const gradeData = {
            quiz: qid,
            user,
            attempt: {
                score,
                answers, // Store the answers in the attempt
            }
        };
    
        console.log("Creating grade with data:", gradeData); // Log the data being created
    
        try {
            const grade = await dao.createGrade(gradeData);
            res.json(grade);
        } catch (error) {
            console.error("Error creating grade:", error); // Log the error if creation fails
            res.status(500).json({ error: error.message });
        }
    };
    
    app.post("/api/courses/:cid/quizzes/:qid/grades", createGrade);

    const findGradesByCourseId = async (req, res) => {
        const { cid } = req.params;
        console.log(`Finding grades for course with ID: ${cid}`); // Log the course ID
        try {
            const grades = await dao.findGradesByCourseId(cid);
            res.json(grades);
        } catch (error) {
            console.error("Error finding grades:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.get("/api/courses/:cid/grades", findGradesByCourseId);

    const findGradeById = async (req, res) => {
        const { gid } = req.params;
        console.log(`Finding grade with ID: ${gid}`); // Log the grade ID
        try {
            const grade = await dao.findGradeById(gid);
            if (grade) {
                res.json(grade);
            } else {
                res.status(404).json({ error: "Grade not found" });
            }
        } catch (error) {
            console.error("Error finding grade:", error);
            res.status(500).json({ error: error.message });
        }
    };
    app.get("/api/courses/:cid/grades/:gid", findGradeById);
}
