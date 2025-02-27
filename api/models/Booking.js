const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    checkIn :{type:String},
    checkOut :{type:String},
    name : {type:String},
    email : {type:String}
})


const Booking = mongoose.model("Booking",bookingSchema)

module.exports = Booking