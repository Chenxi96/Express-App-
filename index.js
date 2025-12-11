import express, { response } from "express";
import "dotenv/config";
import path from 'path';
import session from 'express-session';

import admin from './routes/admin/admin.js';
import user from './routes/admin/user/user.js';


// Absolute path
const __dirname = import.meta.dirname;

// Initialize Express
const app = express();

// Set view engine with pug
app.set('view engine', 'pug');

// Accepts parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {}
}))

app.get('/', async(request, response) => {
    response.redirect('/user');
})

app.use('/user', user);


app.use('/admin',(request, response, next) => {
    console.log(request.session.loggedIn);
    if(request.session.loggedIn) {
        app.locals.user = request.session.user;
        next();
    } else {
        response.redirect('/user')
    }
})

app.use('/admin', admin);


// Direct to the absolute path to the public folder for the static files
app.use(express.static(path.join(__dirname, 'public')));


const port = process.env.PORT || "8888";


app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));
