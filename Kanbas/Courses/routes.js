import * as dao from "./dao.js";
import * as userDao from '../Users/dao.js'
import User from '../Users/model.js'
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

        const currentUser = req.session['currentUser']
        const user = await userDao.findUserById(currentUser._id)
        const alreadyCreated = user.toObject().section
  
        const dedupedSection = [...new Set([...alreadyCreated, course._id])]
        const newUser = new User({
          _id: currentUser._id,
          section: dedupedSection,
          username: currentUser.username,
          password: currentUser.password,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          role: currentUser.role,
        })
        await userDao.updateUser(user._id, newUser)
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