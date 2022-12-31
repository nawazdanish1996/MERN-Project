const mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/regFormDemo", {
    useNewUrlParser: true
})
.then(()=>{
    console.log("Mongoose sucessfully connected...");
}).catch((err)=>{
    console.log("Mongoose not connected...");
})

// var mongoDB = 'mongodb://127.0.0.1/my_database';
// mongoose.connect(mongoDB, { useNewUrlParser: true });