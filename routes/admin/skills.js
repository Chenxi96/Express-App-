import express from 'express';

import db from '../../databases/db.js';

const router = express.Router();

router.get('/', async (request, response) => {
    let listSkills = await db.listSkills();
    console.log(listSkills)
    if(!listSkills.length) {
        await db.addSkills();
        listSkills = await db.listSkills();
    }
    response.render('skills', { skills: listSkills })
})

export default router;