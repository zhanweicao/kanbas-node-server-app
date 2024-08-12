import * as dao from "./dao.js";
import db from "../Database/index.js";
export default function ModuleRoutes(app) {

    const updateModule = async (req, res) => { 
        const { mid } = req.params;
        const status = await dao.updateModule(mid, req.body);
        res.json(status);
    };
    app.put("/api/modules/:mid", updateModule);

    const deleteModule = async (req, res) => {
        const { mid } = req.params;
        const status = await dao.deleteModule(mid);
        res.json(status);
    };
   app.delete("/api/modules/:mid", deleteModule);

    const createModule = async (req, res) => {
        const module = await dao.createModule(req.body);
        res.json(module);
    };
    app.post("/api/courses/:cid/modules", createModule);


    const findAllModules = async (req, res) => {
        const modules = await dao.findAllModules();
        res.json(modules);
    }
    app.get("/api/courses/:cid/modules", findAllModules);

}

