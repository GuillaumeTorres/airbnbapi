let express = require('express')
let router = express.Router()
let User = require('../db/db').User
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let mailer = require('../services/mailer')

const createToken = userData => jwt.sign(userData, process.env.JWT_SECRET)
const addToken = userData => Object.assign(userData, {token: createToken(userData)})

const filterUserData = user => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
})

/**
 * @api {post} /auth/register Create User
 * @apiName createUser
 * @apiGroup User
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
 */
router.post('/register', function(req, res) {
    const userData = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(userData.password, salt)
    userData.password = hash
    userData.salt = salt

    const user = new User(userData)
    user.save()
        .then(user => {
            let body = '<h2>Inscription validé</h2>' +
                '<p>Votre inscription a bien été validé, vous pouvez dès à présent vous connecter avec vos identifiants</p>'
            let mailOptions = {
                from: '"Admin" <admin@airbnblike.com>',
                to: user.email,
                subject: 'Confirmation d\'inscription',
                html: body
            }
            mailer(mailOptions)
            userData._id = user._id
            const userDataWithToken = addToken(filterUserData(userData))
            res.send(userDataWithToken)
        })
        .catch(err => res.send(err))
    // TODO Fix Header issue
})

/**
 * @api {post} /auth/login Login
 * @apiName login
 * @apiGroup User
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
 */
router.post('/login', function(req, res) {
    User.findOne({username: req.body.username})
        .then(user => User.findOne({
            username: user.username,
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