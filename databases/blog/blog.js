import db from "../db.js";

// BLOG
const listBlogs = async () => {
    return await db.Blog.find({});
}

const createBlog = async (blogForm) => {
    await db.Blog.create({
        title: blogForm.title, 
        body: blogForm.description,
        browser: blogForm.browser,
        createdAt: blogForm.createdAt, 
        updatedAt: blogForm.updatedAt
    })
};

const updateBlog = async (blogForm) => {
    await db.Blog.updateOne({ _id: blogForm._id }, {
        title: blogForm.title, 
        body: blogForm.description,
        browser: blogForm.browser,
        createdAt: blogForm.createdAt, 
        updatedAt: blogForm.updatedAt
    })
}

const viewBlog = async (blogId) => await db.Blog.findOne({_id: blogId});

const removeBlog = async (blogId) => await db.Blog.findOneAndDelete({_id: blogId});

export default {
    listBlogs,
    createBlog,
    updateBlog,
    viewBlog,
    removeBlog
}