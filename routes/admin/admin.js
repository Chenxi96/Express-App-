import express from 'express';
const router = express.Router();

import blog from './blog.js';
import skill from './skills.js';
import project from './project.js';

router.use('/blogs', blog);
router.use('/skills', skill);
router.use('/projects', project);

router.get('/', async (request, response) => {
    response.render('adminHome', {name: "Home"})
});

export default router;