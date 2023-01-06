const mongoose = require("mongoose");

// useCreateIndex: true,
// useNewUrlParser: true,
// useUnifiedTopology: true
mongoose.connect("mongodb://127.0.0.1:27017/olympics")
.then(()=>{
    console.log("Mongoose sucessfully connected...");
}).catch((err)=>{
    console.log("Mongoose not connected...");
})