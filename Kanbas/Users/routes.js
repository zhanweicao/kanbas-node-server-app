import mongoose from "mongoose";
import * as dao from "./dao.js";
import User from '../Users/model.js'
// let currentUser = null;
export default function UserRoutes(app) {
    const findAllUsers = async (req, res) => {
        const { role, name } = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }
        if (name) {
            const users = await dao.findUsersByPartialName(name);
            res.json(users);
            return;
        }

        const users = await dao.findAllUsers();
        res.json(users);
    };

    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };


    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };

    const findUserById = async (req, res) => {
        const userID = req.params.userID;
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    app.get("/api/users/:userId", findUserById);

    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        res.json(status);

    };

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken. Form Server" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };


    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).json({ message: "Unable to login. Try again later. Form Server" });
        }
    };


    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };


    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        const user = await dao.findUserById(currentUser._id)
        res.json(user);
    };

    const enroll = async (req, res) => {
      console.log('enroll')
      const currentUser = req.session['currentUser']
      console.log(req.body, currentUser)
      const { course } = req.body
      const user = await dao.findUserById(currentUser._id)
      const alreadyEnrolled = user.toObject().section

      const dedupedSection = [...new Set([...alreadyEnrolled, course])]
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
      console.log(newUser.toObject())
      await dao.updateUser(currentUser._id, newUser)
      res.sendStatus(200)
    }

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
    app.put("/api/users/:userId/enroll", enroll)
}