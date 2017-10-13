let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/airbnbapi', {
    useMongoClient: true
})

let User = mongoose.model('User', {
	firstName: String,
	lastName: String,
	email: String,
	username: String,
	password: String,
	salt: String
})

let House = mongoose.model('House', {
    user: Schema.ObjectId,
    title: String,
    description: String,
    placeNumber: Number,
    address: {
        street: String,
        city: String,
        postal_code: String
    }
})

let Booking = mongoose.model('Booking', {
	user: Schema.ObjectId,
	house: {
        user: Schema.ObjectId,
        title: String,
        description: String,
        placeNumber: Number,
        address: {
            street: String,
            city: String,
            postal_code: String
        }
	},
	reserved: Boolean,
	date: {
		departure: Date,
        arrival: Date
    }
})

module.exports.User = User
module.exports.House = House
module.exports.Booking = Booking
