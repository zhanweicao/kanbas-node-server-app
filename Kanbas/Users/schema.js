import mongoose from "mongoose";

// Assuming you have a Course model based on courseSchema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
        type: String,
        enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
        default: "USER",
    },
    loginId: String,
    section: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course',  
        default: null   
    }],
    lastActivity: Date,
    totalActivity: String,
},
    { collection: "users" }
);

export default userSchema;