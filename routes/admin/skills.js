import express from 'express';

import db from '../../databases/db.js';

const router = express.Router();

router.get('/', async (request, response) => {
    let listSkills = await db.listSkills();
    // console.log(listSkills)
    if(!listSkills.length) {
        await db.addSkills();
        listSkills = await db.listSkills();
    }
    response.render('skills', { skills: listSkills })
})

router.post('/update', async (request, response) => {
    const id = request.body._id;
    const skill = await db.listSkill(id);
    response.render('skillForm', {crud: "Update", skill: skill})
})

router.get('/delete', async (request, response) => {
    const id = request.query._id;
    await db.removeSkill(id)
    response.redirect('/admin/skills');
})


export default router;