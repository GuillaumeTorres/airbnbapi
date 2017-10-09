let express = require('express');
let router = express.Router();
let User = require('../db/db').User

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
            email: "jean@gmail.com"
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
    const user = new User(req.body)
    user.save()
        .then(res.send(user))
        .catch(res.sendStatus(400));
});

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
});

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
        .catch(err => res.send('nanana'))
})

module.exports = router;