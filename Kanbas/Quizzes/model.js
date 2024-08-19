import mongoose from "mongoose";
import quizSchema from "./schema.js";

const Quiz = mongoose.model("quizModel", quizSchema);

export default Quiz;
