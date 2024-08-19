import model from "./model.js";
export const createModule = (Module) => {
    delete Module._id
    return model.create(Module);
}
export const findAllModules = () => model.find();
export const findModulesByCourse = (cid) => model.find({ course: cid })
export const updateModule = (ModuleId, Module) => model.updateOne({ _id: ModuleId }, { $set: Module }); 
export const deleteModule = (ModuleId) => model.deleteOne({ _id: ModuleId });