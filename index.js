import express, { response } from "express";
import "dotenv/config";
import path, { join } from 'path';

import db from "./databases/db.js";

import admin from './routes/admin/admin.js';

// Absolute path
const __dirname = import.meta.dirname;

// Initialize Express
const app = express();

// Set view engine with pug
app.set('view engine', 'pug');

app.use('/admin', admin);

// Direct to the absolute path to the public folder for the static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || "8888";





app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));
