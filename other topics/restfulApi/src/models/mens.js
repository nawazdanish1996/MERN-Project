const Mongoose = require("mongoose");

// schema
const mensSchema = new Mongoose.Schema({
    ranking: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        // no spaces
        trim: true,
        minlength: 3
    },
    dob: {
        type: Date,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    score:  {
        type: Number,
        required: true,
        trim: true
    },
    events:{
        type: String,
        trim: true,
        default: "100m"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Collection creation
const MensRanking = new Mongoose.model("MenRanking", mensSchema);

module.exports = MensRanking;