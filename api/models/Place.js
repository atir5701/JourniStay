const mongoose = require("mongoose")

const placeSchema = mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title :{
        type:String,
        required:true,
    },
    address:{
        type:String,
        unique:true,
        required:true,
    },
    photo:{
        type:[String],
    },
    description:{
        type:String
    },
    checkIn :{type:String},
    checkOut : {type:String},
    maxGuest : {type:Number}
})


const Place = mongoose.model("Place",placeSchema)

module.exports = Place