import mongoose, { Schema } from "mongoose";

// Connection string
await mongoose.connect(`${process.env.MONGO_URI}`, {dbName: `${process.env.DBNAME}`});

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

const userSchema = new Schema({
    username: String,
    password: String
})

// Initialize Skill model
const Skill = mongoose.model('skill', skillSchema);


// Initialize Blog model
const Blog = mongoose.model('blog', blogSchema);

const User = mongoose.model('user', userSchema);

export default {
    Skill,
    Blog,
    User
}