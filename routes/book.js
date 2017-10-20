let express = require('express')
let router = express.Router()
let Booking = require('../db/db').Booking

/**
 * @api {post} /book/search Search
 * @apiName search
 * @apiGroup Booking
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
         {
             "_id": "59e07ba97635dd6885be8aae",
             "reserved": true,
             "date": {
                 "departure": "2017-11-01T09:00:00.000Z",
                 "arrival": "2017-11-10T09:00:00.000Z"
             },
             "house": {
                 "title": "ma maison",
                 "description": "C MA MAISON GUEUH",
                 "placeNumber": 4,
                 "address": {
                     "street": "la rue",
                     "city": "Paris",
                     "postal_code": "92"
                 }
             },
             "user": "59e0bbff4bb62e04db95e30d"
         }
       ]
 */
router.post('/search', (req, res) => {
    const parameters = req.body
    const dateDeparture = new Date(parameters.date_departure)
    const dateArrival = new Date(parameters.date_arrival)
        Booking.find({
            'house.address.city': parameters.city,
            'house.placeNumber': parameters.place_number,
            'reserved': false,
            'date.departure': {$gte: (dateDeparture)},
            'date.arrival': {$lte: dateArrival}
        })
        .then(book => res.send(book))
        .catch(err => res.sendStatus(400).send(err))
})

/**
 * @api {post} /book/create Create reservation
 * @apiName createReservation
 * @apiGroup Booking
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
         "_id": "59e07ba97635dd6885be8aae",
         "reserved": false,
         "date": {
             "departure": "2017-11-01T09:00:00.000Z",
             "arrival": "2017-11-10T09:00:00.000Z"
         },
         "house": {
             "title": "ma maison",
             "description": "C MA MAISON GUEUH",
             "placeNumber": 4,
             "address": {
                 "street": "la rue",
                 "city": "Paris",
                 "postal_code": "92"
             }
         },
         "user": null
        }
 */
router.post('/create', (req, res) => {
    const bookData = new Booking(req.body)

    bookData.save()
        .then(res.send(bookData))
        .catch(res.sendStatus(400).send({error: "The booking process failed"}))
})

/**
 * @api {put} /book/edit/:id Edit house
 * @apiName editBooking
 * @apiGroup Booking
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
         "_id": "59e07ba97635dd6885be8aae",
         "reserved": false,
         "date": {
             "departure": "2017-11-01T09:00:00.000Z",
             "arrival": "2017-11-10T09:00:00.000Z"
         },
         "house": {
             "title": "ma maison",
             "description": "C MA MAISON GUEUH",
             "placeNumber": 4,
             "address": {
                 "street": "la rue",
                 "city": "Paris",
                 "postal_code": "92"
             }
         },
         "user": null
        }
 */
router.put('/edit/:id', (req, res) => {
    Booking.findOneAndUpdate(req.params.id, req.body)
        .then(booking => res.send(booking))
        .catch(err => res.sendStatus(400).send(err))
})

/**
 * @api {post} /book/reserve Reserve
 * @apiName userReservation
 * @apiGroup Booking
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            success: "reservation valided"
       }
 */
router.post('/reserve', (req, res) => {
    const booking = {
        user: req.user._id,
        reserved: true
    }
    Booking.findOneAndUpdate({_id: req.body.id_book}, booking)
        .then(res.send({success: 'reservation valided'}))
        .catch(err => res.sendStatus(400).send(err))
})

/**
 * @api {post} /book/cancel Cancel reservation
 * @apiName cancelReservation
 * @apiGroup Booking
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            success: "reservation canceled"
       }
 */
router.post('/cancel', (req, res) => {
    const booking = {
        user: null,
        reserved: false
    }
    Booking.findOneAndUpdate({_id: req.body.id_book}, booking)
        .then(res.send({success: 'reservation canceled'}))
        .catch(err => res.sendStatus(400).send(err))
})

module.exports = router;