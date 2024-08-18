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

    // "localhost:4000/api/courses/:cid/quizzes/qid/grades/gid"

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
        console.log(req.session)
        const user = req.session?.currentUser?._id
        const { qid } = req.params; // Extract courseId from URL
        const answers = req.body;
        const gradeDoc = new Grade({
          quiz: qid,
          user,
          answers,
          attempt: {
            score: await dao.gradeAnswer(answers)
          }
        })
        console.log("Creating grade with data:", gradeDoc); // Log the data being created

        try {
            const grade = await dao.createGrade(gradeDoc);
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