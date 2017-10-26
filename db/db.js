let mongoose = require('mongoose');
let Schema = mongoose.Schema;

const atlasUri = 'mongodb://airnbnblike:fMqydKR9zjT5sw6A@' +
    'cluster0-shard-00-00-gd129.mongodb.net:27017,' +
    'cluster0-shard-00-01-gd129.mongodb.net:27017,' +
    'cluster0-shard-00-02-gd129.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
const localUri = 'mongodb://localhost/airbnbapi'

mongoose.connect(atlasUri, { useMongoClient: true })

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
