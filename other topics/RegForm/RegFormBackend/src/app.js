const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
// mongoose connected
require("../src/db/conn");

// collection (Schema)
const RegForm = require("./models/users");


const static_path = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(static_path));

// console.log("mister"+path.join(__dirname, "../public"));



app.get('/', (req, res) => {
    res.render("index");
});
// create new user in our database
app.post('/', async (req, res) => {
    try {
        console.log(req.body.name);
        res.send(req.body.name);
    } catch (error) {
        res.status(400).send(error);
    }
});


app.listen(port, () => {
    console.log(`server is running at port localhost:${port}`)
});