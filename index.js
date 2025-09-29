import express from "express";
import "dotenv/config";
import path from 'path';
import { MongoClient } from "mongodb";
import { time } from "console";

// Connection string to MongoDB server
const uri = process.env.MONGO_URI;
// Create a connection to mongoDB
const client = new MongoClient(uri);
// Connect to mongoDB database named "Portfolio"
const database = client.db("Portfolio");

// Absolute path
const __dirname = import.meta.dirname;

// Initialize Express
const app = express();

// Set view engine with pug
app.set('view engine', 'pug');

// Direct to the absolute path to the public folder for the static files
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || "8888";

app.get('/', async (request, response) => {
    response.render('layout', { name: "Admin"});
})

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));

const viewBlogs = async () => database.collection("blogs").find({}).toArray();