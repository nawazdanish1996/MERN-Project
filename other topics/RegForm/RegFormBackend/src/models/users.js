const mongoose = require("mongoose");
// const validator = require("validator");

const RegFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    verifyPassword:{
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


// collection creation
const RegForm = new mongoose.model("RegForm", RegFormSchema);

module.exports = RegForm;