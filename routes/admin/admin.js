import express from 'express';
const router = express.Router();

import blog from './blog.js'

router.use('/blogs', blog);

router.get('/', async (request, response) => {
    response.render('adminHome', {name: "Home"})
})

export default router;