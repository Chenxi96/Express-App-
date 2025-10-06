import express from 'express';

const router = express.Router();

import db from '../../databases/db.js';

router.get('/', async(request, response) => {
    let blogList = await db.listBlogs();

    if(!blogList.length) {
        await db.addBlogs();
        blogList = await db.listBlogs();
    }

    response.render('blogs', { name: "Admin", blogs: blogList});
})

router.post('/createPost', async (request, response) => {
    const data = request.body;
    await db.createBlog(data.titleName, data.description, data.image);
    response.redirect('/admin')
})

router.get('/create', async (request, response) => {
    response.render('blogForm', { crud: "Create"})
})

router.post('/update', async (request, response) => {
    const id = request.body._id;
    console.log(request.body)
    const blog = await db.viewBlog(id);
    
    response.render('blogForm', { name: "Update", crud: "Update", blog: blog});
})


export default router;