let express = require('express')
let router = express.Router()
let User = require('../db/db').User
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')

const createToken = userData => jwt.sign(userData, process.env.JWT_SECRET)
const addToken = userData => Object.assign(userData, {token: createToken(userData)})

/**
 * @api {get} /user/:id Show User
 * @apiName showUser
 * @apiGroup User
 * @apiSuccess {String} firstName lastName of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            firstName: "Jean",
            lastName: "Dupond",
            email: "jean@gmail.com"
       }
 *
 * @apiError UserNotFound An error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 */
router.get('/:id', function(req, res) {
    User.find({
        _id: req.params.id
    })
        .then(user => res.send(user))
        .catch(err => res.send(err))
})

/**
 * @api {post} /user/create Create new user
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
router.post('/create', function(req, res) {
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
 * @api {put} /user/edit/:id Edit User
 * @apiName editUser
 * @apiGroup User
 * @apiSuccess {String} firstName lastName of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            firstName: "Jean",
            lastName: "Dupond",
            email: "jean@gmail.com"
       }
 *
 * @apiError UserNotFound An error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 */
router.put('/edit/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.send(user))
        .catch(err => res.send(err))
})

/**
 * @api {get} /user/:id Delete User
 * @apiName deleteUser
 * @apiGroup User
 * @apiSuccess {String} firstName lastName of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "success": "User removed"
       }
 *
 * @apiError UserNotFound An error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 */
router.delete('/delete/:id', function(req, res) {
    User.remove({
        _id: req.params.id
    })
        .then(res.send({success: 'User deleted'}))
        .catch(err => res.send(err))
})

module.exports = router;