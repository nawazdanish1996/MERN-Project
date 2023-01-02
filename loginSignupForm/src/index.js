require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const hbs = require("hbs");
//mongodb connected
require("./mongodb");
// collection schema
const RegForm = require("./modelSchema");
const bcrypt = require('bcryptjs');


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

app.get("/", (req, resp)=>{
    resp.render("home");
});
app.get("/signup", (req, resp)=>{
    resp.render("signup");
});
app.get("/login", (req, resp)=>{
    resp.render("login");
});

// create new user in our database
app.post('/signup', async (req, res) => {
    try {
        const {name, username, password, vpassword} = req.body;

        if(password === vpassword){
            const data = new RegForm({
                name: name,
                username: username,
                password: password,
                vpassword: vpassword
            });
            //token generate
            const token = await data.generateAuthToken();

            const register = await data.save();
            // console.log(register);
            res.status(201).render("home")
        }else{
            res.send("Password are not matching");
        }

    } catch (error) {
        // res.send("Error Page")
        // console.log(error);
        res.status(400).send(error);
        console.log(error);
    }
});
// login user in our database
app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;

        const check = await RegForm.findOne({username: username});
        const isMatch = await bcrypt.compare(password, check.password);

        const token = await check.generateAuthToken();
        // console.log(token);

        if(isMatch){
            res.status(201).render("home");
        }
        else{
            res.send("Invalid Password");
        }

    } catch (error) {
        // alert("Invalid Username");
        res.send("Invalid Username");
        // res.status(400).send(error);
    }
});


// bcryptjs imported
// const securePassword  = async (password) =>{

//    const passwordHash = await bcrypt.hash(password, 10);
//    console.log(passwordHash);

//    const passwordMatch = await bcrypt.compare(password, passwordHash);
//    console.log(passwordMatch);
// }

// securePassword("thapa@123");



// json Web Token
// const createToken = async() =>{
//     const token = await jwt.sign({_id: "63b2f00d90c3288a6028950c"}, "secretKey63b2f00d90c3288a6028950c63b2f00d90c3288a6028950c", {
//         expiresIn:  "3 seconds"
//     })
//     // console.log(token);

//     const userVerify = await jwt.verify(token, "secretKey63b2f00d90c3288a6028950c63b2f00d90c3288a6028950c")
//     console.log(userVerify);
// }
// createToken();

app.listen(port, ()=>{
    console.log(`listening to the port localhost:${port}`);
})