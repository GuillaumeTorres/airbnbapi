var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/airbnbapi');

var User = mongoose.model('User', {
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	salt: String
});

var Booking = mongoose.model('Booking', {
	user: Schema.ObjectId,
	reserved: Boolean,
	title: String,
	description: String,
	placeNumber: Number,
    address: {
        street: String,
        city: String,
        postal_code: String
    },
	created: Date
});


module.exports.User = User;
module.exports.Booking = Booking;
