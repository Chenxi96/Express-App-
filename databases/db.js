import mongoose, { Schema } from "mongoose";

// Connection string
await mongoose.connect(`${process.env.MONGO_URI}${process.env.DBNAME}`);

// Blog schema WILL NEED TO IMPLEMENT IMAGE URL LINK
const blogSchema = new Schema({
    title: String,
    body: String,
    category: String,
    createdAt: Date,
    updatedAt: Date
});

// Skills schema
const skillSchema = new Schema({
    title: String,
    body: String,
    image: String,
})

// Initialize Skill model
const Skill = mongoose.model('skill', skillSchema);


// Initialize Blog model
const Blog = mongoose.model('blog', blogSchema);


// BLOG
const addBlogs = async () => {
    return await Blog.insertMany([
        {
            title: "Javascript",
            body: "Using React is quiet fun, being able to use this is good. I wonder if this is a right time to do this dklfasjdflkjadsflkjsdflkjsaf",
            category: "Javascript",
            createdAt: "2025-02-23",
            updatedAt: "2025-02-23"
        },
        {
            title: "React State",
            body: "Using React is quiet fun, being able to use this is good. I wonder if this is a right time to do this dklfasjdflkjadsflkjsdflkjsaf",
            category: "React",
            createdAt: "2025-02-23",
            updatedAt: "2025-02-23"
        },
        {
            title: "CSS Frameworks",
            body: "Using React is quiet fun, being able to use this is good. I wonder if this is a right time to do this dklfasjdflkjadsflkjsdflkjsaf",
            category: "CSS",
            createdAt: "2025-02-23",
            updatedAt: "2025-02-23"
        },
    ])
}

const listBlogs = async () => {
    return await Blog.find({});
}

const createBlog = async (blogForm) => {
    await Blog.create({
        title: blogForm.title, 
        body: blogForm.body,
        createdAt: blogForm.createdAt, 
        updatedAt: blogForm.updatedAt
    })
};

const viewBlog = async (blogId) => await Blog.findOne({_id: blogId});

const removeBlog = async (blogId) => await Blog.findOneAndDelete({_id: blogId});

// SKILL
const addSkills = async () => {
    await Skill.insertMany([
        {
            title: "Javascript",
            body: "Work with Javascript"
        },
        {
            title: "CSS",
            body: "Worked with CSS"
        },
        {
            title: "HTML",
            body: "Worked with HTML"
        },
        {
            title: "Node",
            body: "Worked with Node"
        },
        {
            title: "Express",
            body: "Worked with Express"
        },
        {
            title: "C#",
            body: "Worked with C#"
        },
    ])
}

const createSkill = async (skillForm, skillImage) => {
    return await Skill.create({
        title: skillForm.title,
        body: skillForm.description,
        image: skillImage
    })
}

const listSkills = async () => {
    return await Skill.find({});
}

const listSkill = async (id) => {
    return await Skill.findOne({_id: id})
}

const removeSkill = async (skillId) => await Skill.findOneAndDelete(skillId);

export default {
    addBlogs,
    listBlogs,
    createBlog,
    viewBlog,
    removeBlog,
    addSkills,
    createSkill,
    listSkills,
    listSkill,
    removeSkill
}