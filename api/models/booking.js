const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
        name: { type: String, required:true},
        phone:{ type: String, required:true},
        date:{ type: String, required:true},
        time:{ type: String, required:true},
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        }
    });
const booking = mongoose.model("Booking", bookingSchema );
module.exports = booking;