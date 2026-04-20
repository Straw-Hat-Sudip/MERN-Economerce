const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken: String,
    expireToken: Date
},{
    timestamps: true
});


const userModel = mongoose.model("user", userSchema)

module.exports = userModel