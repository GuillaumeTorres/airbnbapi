let mongoose = require('mongoose');
let Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/airbnbapi', {
    useMongoClient: true
})

let User = mongoose.model('User', {
    username: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	salt: String
})

let House = mongoose.model('House', {
    user: { type: Schema.ObjectId, required: true },
    title: { type: String, required: true, max: 20 },
    description: { type: String, required: true },
    place_number: { type: Number, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postal_code: { type: Number, required: true }
    }
})

let Booking = mongoose.model('Booking', {
	user: { type: Schema.ObjectId, default: null },
	house: {
        user: { type: Schema.ObjectId, required: true },
        title: { type: String, required: true, max: 20 },
        description: { type: String, required: true },
        place_number: { type: Number, required: true },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            postal_code: { type: Number, required: true }
        }
    },
	reserved: { type: Boolean, default: false },
	date: {
		departure: { type: Date, required: true },
        arrival: { type: Date, required: true }
    }
})

module.exports.User = User
module.exports.House = House
module.exports.Booking = Booking
