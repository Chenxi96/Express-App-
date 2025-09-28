import express from "express";
import "dotenv/config";
import {MongoClient} from "mongodb";

// Connection to MongoDB server
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const database = client.db("Portfolio");





const app = express();

const port = process.env.PORT || "8888";



app.get('/', async (request, response) => {
    response.send("hello world!");
})

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));

const viewBlogs = async () => database.collection("blogs").find({}).toArray();