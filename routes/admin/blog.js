import express from 'express';
import multer from 'multer';

const router = express.Router();

import db from '../../databases/blog/blog.js';

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
    console.log(request.session.user)
    response.render('blogs', { name: "Admin", blogs: blogList});
})

// Route to upload images to local folder
router.post('/api/upload', upload.single('image'), async (request, response ) => {
    const path = (request.file.path).slice(6);
    response.json(path);
})


router.post('/createPost', async (request, response) => {
    const data = request.body;
    console.log(data)
    await db.createBlog(data);
    response.redirect('/admin')
})

router.post('/updatePost', async (request, response) => {
    const data = request.body;
    await db.updateBlog(data)
    response.redirect('/admin');
})

router.get('/create', async (request, response) => {
    response.render('blogForm', { crud: "Create"})
})

router.post('/update', async (request, response) => {
    const id = request.body._id;
    const blog = await db.viewBlog(id);
    response.render('blogForm', { name: "Update", crud: "Update", blog: blog});
})

router.get('/delete', async (request, response) => {
    const id = request.query._id;
    await db.removeBlog(id);
    response.redirect('/admin/blogs');
})


export default router;