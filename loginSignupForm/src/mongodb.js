const mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect(process.env.TABLE , { 
    useNewUrlParser: true 
}).then(()=>{
    console.log("Mongoose sucessfully connected...");
}).catch((err)=>{
    console.log("Mongoose not connected...");
});