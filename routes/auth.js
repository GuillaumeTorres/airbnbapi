let express = require('express')
let router = express.Router()
let User = require('../db/db').User
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

const createToken = userData => jwt.sign(userData, process.env.JWT_SECRET)
const addToken = userData => Object.assign(userData, {token: createToken(userData)})

const filterUserData = user => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
})

/**
 * @api {post} /auth/register Create new user
 * @apiName createUser
 * @apiGroup User
 * @apiSuccess {String} firstName lastName of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
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
 *       "error": "User not created"
 *     }
 */
router.post('/register', function(req, res) {
    const userData = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userData.password, salt)
    userData.password = hash
    userData.salt = salt

    const user = new User(userData)
    const userDataWithToken = addToken(userData)
    user.save()
        .then(res.send(userDataWithToken))
        .catch(res.sendStatus(400))
    // TODO Fix Header issue
})

/**
 * @api {post} /auth/login Login
 * @apiName login
 * @apiGroup User
 * @apiSuccess {String} firstName lastName of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            firstName: "Jean",
            lastName: "Dupond",
            email: "jean@gmail.com",
            "password": "$2a$10$sI45ho/YSKX5P1mlv/DjfeoJW4jJWnYtWC4WRl9aDCUpe2/k8eGtu",
            "salt": "$2a$10$sI45ho/YSKX5P1mlv",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
       }
 *
 * @apiError UserNotLogged An error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 */
router.post('/login', function(req, res) {
    User.findOne({email: req.body.email})
        .then(user => User.findOne({
            email: user.email,
            password: bcrypt.hashSync(req.body.password, user.salt)
        }))
        .then(user => {
            if (!user) res.send({error: 'not found'})
            const userDataWithToken = addToken(filterUserData(user))
            res.send(userDataWithToken)
        })
        .catch(err => res.send(err))
})

module.exports = router;