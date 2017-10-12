let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/airbnbapi', {
    useMongoClient: true
});

let User = mongoose.model('User', {
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	salt: String
});

let Booking = mongoose.model('Booking', {
	user: Schema.ObjectId,
	house: Schema.ObjectId,
	date:{
		arrival: Date,
		departure: Date
	}
});

let House = mongoose.model('House', {
    user: Schema.ObjectId,
    title: String,
    description: String,
    placeNumber: Number,
    address: {
        street: String,
        city: String,
        postal_code: String
    },
})


module.exports.User = User;
module.exports.Booking = Booking;
module.exports.House = House;
