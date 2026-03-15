import db from '../db.js';

// Project
const createProject = async (projectForm, projectImage) => {
    return await db.Project.create({
        title: projectForm.title,
        image: projectImage,
        image_description: projectForm.image_description,
        language_used: [projectForm.language_used]
    })
}

const listProjects = async () => {
    return await db.Project.find({});
}

const listProject = async (id) => {
    return await db.Project.findOne({_id: id})
}

const removeProject = async (projectId) => await db.Project.findOneAndDelete(projectId);

export default {
    createProject,
    listProjects,
    listProject,
    removeProject
}