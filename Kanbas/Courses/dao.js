import model from "./model.js";
export const createCourse = (Course) => {
    delete Course._id
    return model.create(Course);
}
export const findAllCourses = () => model.find();
export const findCourseByCoursename = (Coursename) => model.findOne({ Coursename: Coursename });
export const findCoursesByPartialName = (partialName) => model.find({ name: { $regex: partialName, $options: "i" } });
export const updateCourse = (CourseId, Course) => model.updateOne({ _id: CourseId }, { $set: Course });
export const deleteCourse = (CourseId) => model.deleteOne({ _id: CourseId });
