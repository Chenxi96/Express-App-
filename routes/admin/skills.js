import express from 'express';
import multer from "multer";

import db from '../../databases/skill/skill.js';

import ImageKit from 'imagekit';

const client = new ImageKit({
    publicKey : "public_T2HdIbpcwGI+SfclDpMuDn/g2oI=",
    privateKey : process.env.IMAGEKIT_KEY,
    urlEndpoint : "https://ik.imagekit.io/76nhtc3tu"
});


const router = express.Router();

const upload =  multer({ storage: multer.memoryStorage() });

router.get('/', async (request, response) => {
    let listSkills = await db.listSkills();
    response.render('skills', { skills: listSkills })
});

router.get('/create', async (request, response) => {
    response.render('skillForm', {crud: "Create"});
})

router.post('/createPost', upload.single('image'), async(request, response) => {
    const skillForm = request.body;
    const skillImage = request.file;
    client.upload({
        file: skillImage.buffer.toString("base64"),
        fileName: skillImage.originalname,
        tags: ["skills"],
        folder: "/skills",
    }, async function(err, result) {
        if(err) console.log(err);
        else {

            console.log(result.url)
            await db.createSkill(skillForm, result.url)
        };
    })
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