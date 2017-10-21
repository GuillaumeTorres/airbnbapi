let express = require('express')
let router = express.Router()
let House = require('../db/db').House

/**
 * @api {get} /house/:id Show House
 * @apiName showHouse
 * @apiGroup House
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            house: 1,
            title: "Lorem ipsum",
            description: "consectetur adipiscing elit",
            place_number: 4,
            address: {
                street: "2 rue proident",
                city: "Paris",
                postal_code: 75001
            }
        }
 */
router.get('/:id', (req, res) => {
    House.findOne({ _id: req.params.id })
        .then(house => res.send(house))
        .catch(err => res.status(404).send(err.message || 500))
})

/**
 * @api {post} /house/create Create House
 * @apiName createHouse
 * @apiGroup House
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            house: 1,
            title: "Lorem ipsum",
            description: "consectetur adipiscing elit",
            place_number: 4,
            address: {
                street: "2 rue proident",
                city: "Paris",
                postal_code: 75001
            }
        }
 */
router.post('/create', (req, res) => {
    const house = new House(req.body)

    house.save()
        .then(house => res.send(house))
        .catch(err => res.status(400).send(err.message || 500))
})

/**
 * @api {put} /house/edit/:id Edit house
 * @apiName editHouse
 * @apiGroup House
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            house: 1,
            title: "Lorem ipsum",
            description: "consectetur adipiscing elit",
            place_number: 4,
            address: {
                street: "2 rue proident",
                city: "Paris",
                postal_code: 75001
            }
        }
 */
router.put('/edit/:id', (req, res) => {
    House.findOneAndUpdate(req.params.id, req.body)
        .then(house => res.send(house))
        .catch(err => res.status(404).send(err.message || 500))
})

/**
 * @api {delete} /house/delete/:id Delete house
 * @apiName deleteHouse
 * @apiGroup House
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "success": "House deleted"
       }
 */
router.delete('/delete/:id', (req, res) => {
    House.remove({ _id: req.params.id })
        .then(res.send({success: 'House deleted'}))
        .catch(err => res.status(404).send(err.message || 500))
})

module.exports = router;