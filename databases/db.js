import mongoose, { Schema } from "mongoose";

// Connection string
await mongoose.connect(`${process.env.MONGO_URI}${process.env.DBNAME}`);

// Blog schema WILL NEED TO IMPLEMENT IMAGE URL LINK
const blogSchema = new Schema({
    title: String,
    body: String,
    browser: String,
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
const listBlogs = async () => {
    return await Blog.find({});
}

const createBlog = async (blogForm) => {
    await Blog.create({
        title: blogForm.title, 
        body: blogForm.description,
        browser: blogForm.browser,
        createdAt: blogForm.createdAt, 
        updatedAt: blogForm.updatedAt
    })
};

const updateBlog = async (blogForm) => {
    await Blog.updateOne({ _id: blogForm._id }, {
        title: blogForm.title, 
        body: blogForm.description,
        browser: blogForm.browser,
        createdAt: blogForm.createdAt, 
        updatedAt: blogForm.updatedAt
    })
}

const viewBlog = async (blogId) => await Blog.findOne({_id: blogId});

const removeBlog = async (blogId) => await Blog.findOneAndDelete({_id: blogId});

// SKILL
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
    listBlogs,
    createBlog,
    viewBlog,
    updateBlog,
    removeBlog,
    createSkill,
    listSkills,
    listSkill,
    removeSkill
}