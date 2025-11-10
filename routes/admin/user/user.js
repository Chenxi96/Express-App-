import express from 'express';
import db from '../../../databases/user/user.js'

const router = express.Router();

router.get('/', async(request, response) => {
    const user = request.session.user;
    response.render('user/login', {user: user});
})

router.post('/login', async(request, response) => {
    const form = request.body;
    const hasProfile = await db.authenticateUser(form);
    if(hasProfile) {
        request.session.loggedIn = true;
        request.session.user = form.username
        response.redirect('/admin')
    } else {
        response.render('user/login', { err: "No matching user found" })
    }
})

router.get('/register', async(request, response) => {
    response.render('user/register');
})

router.post('/createProfile', async(request, response) => {
    const form = request.body
    await db.createUser(form);
    response.redirect('/admin');
})

router.get('/logout', async(request, response) => {
    request.session.destroy();
    response.redirect('/');
})


export default router;