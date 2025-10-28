import express from 'express';
const router = express.Router();

import blog from './blog.js';
import skill from './skills.js';

import db from '../../databases/db.js'

router.use('/blogs', blog);
router.use('/skills', skill);

router.get('/', async (request, response) => {
    response.render('adminHome', {name: "Home"})
});

// Route to retrieve blog collection "admin/api/listblogs"
router.get('/api/listBlogs', async(request, response) => {
    const blogList = await db.listBlogs();
    response.json(blogList);
})

// Route to retrieve skill collection "admin/api/listskills"
router.get('/api/listSkills', async(request, response) => {
    const blogList = await db.listSkills();
    response.json(blogList);
})

export default router;