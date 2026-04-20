const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    fullName: String,
    addressLine: String,
    phone: String,
    city: String,
    state: String,
    pincode: String,

},{
    timestamps: true
})

const address = mongoose.model("Address", addressSchema)

module.exports = address