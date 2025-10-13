import express, { response } from 'express';
import multer from "multer";

import db from '../../databases/db.js';

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, 'public/img/skills');
    },
    filename: (request, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const router = express.Router();

const upload =  multer({ storage: storage});

router.get('/', async (request, response) => {
    let listSkills = await db.listSkills();
    // console.log(listSkills)
    if(!listSkills.length) {
        await db.addSkills();
        listSkills = await db.listSkills();
    }
    response.render('skills', { skills: listSkills })
});

router.get('/create', async (request, response) => {
    
    response.render('skillForm', {crud: "Create"});
})

router.post('/createPost', upload.single('image'), async(request, response) => {
    const skillForm = request.body;
    const skillImage = request.file;
    console.log(skillImage)
    await db.createSkill(skillForm, skillImage.filename);
    response.redirect('/admin/skills');
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