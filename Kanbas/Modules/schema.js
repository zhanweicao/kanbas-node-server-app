import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    name: String,
    description: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    lessons: [
      {
        name: String,
        description: String,
        module: String,
      }
    ]
},
    { collection: "modules" }
);
export default moduleSchema;