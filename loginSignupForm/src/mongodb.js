const mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect('mongodb://127.0.0.1/loginSignUp', { 
    useNewUrlParser: true 
}).then(()=>{
    console.log("Mongoose sucessfully connected...");
}).catch((err)=>{
    console.log("Mongoose not connected...");
});