import mongoose from "mongoose";
import questionSchema from "./schema.js"; 

const Question = mongoose.model("QuestionModel", questionSchema);

export default Question;
