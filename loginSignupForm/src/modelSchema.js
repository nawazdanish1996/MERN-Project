const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const loginSchema = new mongoose.Schema({
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
    vpassword:{
        type: String,
        required: true
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

// token generate
loginSchema.methods.generateAuthToken = async function (){
    try{
        const token = jwt.sign({_id: this._id.toString()}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        res.send("The error part"+err);
    }
}


// converting password into hash (bcrypt)
loginSchema.pre("save", async function(next){
    if(this.isModified("password")){
    //     const passwordHash = await bcrypt.hash(password, 10);
    //     // console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        // this.vpassword = undefined;
        this.vpassword = await bcrypt.hash(this.password, 10);
    }
    // const passwordHash = await bcrypt.hash(password, 10);
    // this.password = await bcrypt.hash(this.password, 10);
    next();
})

// collection creation
const lastLogin = new mongoose.model("Raja", loginSchema);

module.exports = lastLogin;