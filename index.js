import express from "express";
import "dotenv/config";

const app = express();

const port = process.env.PORT || "8888";

app.get('/', (request, response) => {
    response.send("hello world!");
})

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`));