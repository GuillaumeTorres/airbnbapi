let express = require('express')
let router = express.Router()
let Booking = require('../db/db').Booking


/**
 * @api {post} /auth/register Create new user
 * @apiName createUser
 * @apiGroup User
 * @apiSuccess {String} firstName lastName of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *
 *     {
            firstName: "Jean",
            lastName: "Dupond",
            email: "jean@gmail.com",
            "password": "$2a$10$sI45ho/YSKX5P1mlv/DjfeoJW4jJWnYtWC4WRl9aDCUpe2/k8eGtu",
            "salt": "$2a$10$sI45ho/YSKX5P1mlv",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
       }
 *
 * @apiError UserNotCreated An error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "The booking process failed"
 *     }
 */
router.post('/create', function(req, res) {
    const bookData = new Booking(req.body)

    bookData.save()
        .then(res.send(bookData))
        .catch(res.sendStatus(400).send({error: "The booking process failed"}))
    // TODO Fix Header issue
})

module.exports = router;