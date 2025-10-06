import express, { response } from "express";
import "dotenv/config";
import path, { join } from 'path';

import db from "./databases/db.js";

// Absolute path
const __dirname = import.meta.dirname;

// Initialize Express
const app = express();

// Set view engine with pug
app.set('view engine', 'pug');

// Direct to the absolute path to the public folder for the static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || "8888";

app.get('/admin/', async (request, response) => {
    let blogList = await db.listBlogs();

    if(!blogList.length) {
        await db.addBlogs();
        blogList = await db.listBlogs();
    }

    response.render('blogs', { name: "Admin", blogs: blogList});
})

app.post('/admin/createPost', async (request, response) => {
    const data = request.body;
    await db.createBlog(data.titleName, data.description, data.image);
    response.redirect('/admin')
})

app.get('/admin/create', async (request, response) => {
    response.render('blogForm', { crud: "Create"})
})

app.post('/admin/update', async (request, response) => {
    const id = request.body._id;

    const blog = await db.viewBlog(id);
    
    response.render('blogForm', { name: "Update", crud: "Update", blog: blog});
})


app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));
