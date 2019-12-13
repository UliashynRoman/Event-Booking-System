const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const bookingSchema = new Schema({
    event:{
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true} // when a booking happend , when a user booked an event
);

module.exports = mongoose.model('Booking',bookingSchema);