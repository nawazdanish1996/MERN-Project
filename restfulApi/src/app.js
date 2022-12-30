const express = require("express");
const app = express();
const port = 8080 || process.env.PORT;
const router = require("./router/router");

// connected mongoose
require("../src/db/conn");


// collection
const MensRanking = require("./models/mens");

// middleware
app.use(express.json());

// router
app.use(router);

// Listening
app.listen(port, ()=>{
    console.log(`Listening to the localhost:${port}`);
})