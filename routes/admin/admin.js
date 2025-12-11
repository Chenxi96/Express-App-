import express from 'express';
const router = express.Router();

import blog from './blog.js';
import skill from './skills.js';

router.use('/blogs', blog);
router.use('/skills', skill);

router.get('/', async (request, response) => {
    response.render('adminHome', {name: "Home"})
});

export default router;