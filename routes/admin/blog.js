import express from 'express';
import multer from 'multer';

const router = express.Router();

import db from '../../databases/db.js';

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'public/img/blogs');
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage });

router.get('/', async(request, response) => {
    const blogList = await db.listBlogs();

    response.render('blogs', { name: "Admin", blogs: blogList});
})

// Route to upload images to local folder
router.post('/api/upload', upload.single('image'), async (request, response ) => {
    const path = (request.file.path).slice(6);
    response.json(path);
})

// Route to retrieve blog collection "admin/blogs/api/listblogs"
router.get('/api/listBlogs', async(request, response) => {
    const blogList = await db.listBlogs();
    response.json(blogList);
})

router.post('/createPost', async (request, response) => {
    const data = request.body;
    await db.createBlog(data);
    response.redirect('/admin')
})

router.get('/create', async (request, response) => {
    response.render('blogForm', { crud: "Create"})
})

router.post('/update', async (request, response) => {
    const id = request.body._id;

    const blog = await db.viewBlog(id);
    const blogTitle = blog.title;
    const blogBody = blog.body;
    console.log(blog)
    response.render('blogForm', { name: "Update", crud: "Update", title: blogTitle, body: blogBody});
})

router.get('/delete', async (request, response) => {
    const id = request.query._id;
    await db.removeBlog(id);
    response.redirect('/admin/blogs');
})


export default router;