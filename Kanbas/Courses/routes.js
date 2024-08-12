import * as dao from "./dao.js";
import Database from "../Database/index.js";
export default function CourseRoutes(app) {

    const updateCourse = async (req, res) => {
        const { id } = req.params;
        const status = await dao.updateCourse(id, req.body);
        res.json(status);
    };


    app.put("/api/courses/:id", updateCourse);

    const deleteCourse = async (req, res) => {
        const status = await dao.deleteCourse(req.params.id);
        res.json(status);
    };


    app.delete("/api/courses/:id", deleteCourse);

    const createCourse = async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    };
    app.post("/api/courses", createCourse);

    const findAllCourses = async (req, res) => {
        const { name } = req.query;
        // if (name) {
        //     const courses = await dao.findCoursesByPartialName(name);
        //     res.json(courses);
        //     return;
        // }
        const courses = await dao.findAllCourses();
        res.json(courses);
    };
    app.get("/api/courses", findAllCourses);



}
