import express from 'express';
import multer from "multer";

import db from '../../databases/project/project.js';

import ImageKit from 'imagekit';

const client = new ImageKit({
    publicKey : "public_T2HdIbpcwGI+SfclDpMuDn/g2oI=",
    privateKey : process.env.IMAGEKIT_KEY,
    urlEndpoint : "https://ik.imagekit.io/76nhtc3tu"
});


const router = express.Router();

const upload =  multer({ storage: multer.memoryStorage() });

router.get('/', async (request, response) => {
    let listProjects = await db.listProjects();
    response.render('projects', { projects: listProjects })
});

router.get('/create', async (request, response) => {
    response.render('projectForm', {crud: "Create"});
})

router.post('/createPost', upload.single('image'), async(request, response) => {
    const projectForm = request.body;
    const projectImage = request.file;
    client.upload({
        file: projectImage.buffer.toString("base64"),
        fileName: projectImage.originalname,
        tags: ["projects"],
        folder: "/projects",
    }, async function(err, result) {
        if(err) console.log(err);
        else {

            console.log(result.url)
            await db.createProject(projectForm, result.url)
        };
    })
    response.redirect('/admin/projects');
})

router.post('/update', async (request, response) => {
    const id = request.body._id;
    const project = await db.listProjects(id);
    response.render('projectForm', {crud: "Update", project: project})
})

router.get('/delete', async (request, response) => {
    const id = request.query._id;
    await db.removeProject(id)
    response.redirect('/admin/projects');
})


export default router;