import "dotenv/config";
import express from 'express';
import session from "express-session";
import mongoose from "mongoose";
import Hello from "./Hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from './Kanbas/Assignment/routes.js';
import UserRoutes from "./Kanbas/Users/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
import QuestionRoutes from "./Kanbas/Questions/routes.js";
import GradeRoutes from "./Kanbas/Grades/routes.js";
const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));


const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
QuestionRoutes(app);
QuizRoutes(app);
GradeRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000)