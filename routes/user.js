let express = require('express')
let router = express.Router()
let User = require('../db/db').User

const formatUser = user => {
    user.password = undefined
    user.salt = undefined

    return user
}

/**
 * @api {get} /user Show current user
 * @apiName showUser
 * @apiGroup User
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          username: "jdupond",
            first_name: "Jean",
            last_name: "Dupond",
            email: "jean@gmail.com"
       }
 */
router.get('/', (req, res) => {
    User.findOne({ _id: req.user._id })
        .then(formatUser)
        .then(user => res.send(user))
        .catch(err => res.status(404).send(err.message || 500))
})

/**
 * @api {put} /user/edit/:id Edit User
 * @apiName editUser
 * @apiGroup User
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          username: "jdupond",
            first_name: "Jean",
            last_name: "Dupond",
            email: "jean.dupond@gmail.com"
       }
 */
router.put('/edit/:id', (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(formatUser)
        .then(user => res.send(user))
        .catch(err => res.status(404).send(err.message || 500))
})

/**
 * @api {delete} /user/delete/:id Delete User
 * @apiName deleteUser
 * @apiGroup User
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "success": "User deleted"
       }
 */
router.delete('/delete/:id', (req, res) => {
    User.remove({ _id: req.params.id })
        .then(res.send({success: 'User deleted'}))
        .catch(err => res.status(404).send(err.message || 500))
})

module.exports = router;