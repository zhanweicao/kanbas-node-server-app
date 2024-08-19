import mongoose from "mongoose";
import gradeSchema from "./schema.js";

const Grade = mongoose.model("gradeModel", gradeSchema);

export default Grade;
