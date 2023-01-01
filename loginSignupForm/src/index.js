const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
//mongodb connected
require("./mongodb");
// collection schema
const RegForm = require("./modelSchema");


// path
const static_path = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
// console.log("path"+ path.join(__dirname, "../public"));

// app.use(express.urlencoded({extended: false}));
// middleware
app.use(express.json());

// view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(static_path));
app.use(express.urlencoded({extended: false}));

//

app.get("/", (req, resp)=>{
    resp.render("login");
});
app.get("/signup", (req, resp)=>{
    resp.render("signup");
});

// create new user in our database
app.post('/signup', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        }
        const result = await RegForm.insertMany([data]);
        console.log(result);
        res.render("home")

    } catch (error) {
        // res.send("Error Page")
        // console.log(error);
        res.status(400).send(error);
    }
});
// login user in our database
app.post('/login', async (req, res) => {
    try {
        const check = await RegForm.findOne({username: req.body.username});
        if(check.password === req.body.password && check.username === req.body.username){
            res.render("home");
        }else{
            res.send("Wrong Username")
        }

    } catch (error) {
        res.send("Invalid Username")
        // res.status(400).send(error);
    }
});


// bcryptjs imported
const bcrypt = require('bcryptjs');

const securePassword  = async(password) =>{

   const passwordHash = await bcrypt.hash(password, 10);
   console.log(passwordHash);

   const passwordMatch = await bcrypt.compare(password, passwordHash);
   console.log(passwordMatch);
}

securePassword("thapa@123");


app.listen(port, ()=>{
    console.log(`listening to the port localhost:${port}`);
})