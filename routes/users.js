var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send(
      {
          author: {
              firstName: 'Jean',
              lastName: 'Dupond',
              email: 'jean.dupond@gmail.com',
              address: {
                  rue: '9 rue de la Paix',
                  city: 'Paris',
                  postal_code: '75002'
              },
              phone_number: '0683165620',
              coordinate: {
                  long: 2.331241099999943,
                  lat: 48.8687607
              }
          },
          created: 1457910000
      }
  );
});

module.exports = router;

/**
 * @api {get} /user Request User Presentation Page
 * @apiName GetUserBasicRequest
 * @apiGroup User
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "author":{
 *              "firstName":"Jean",
 *              "lastName":"Dupond",
 *              "email":"jean.dupond@gmail.com",
 *              "address":{
 *                  "rue":"9 rue de la Paix",
 *                  "city":"Paris",
 *                  "postal_code":"75002"
 *                  },
 *              "phone_number":"0683165620",
 *          "coordinate":{
 *              "long":2.331241099999943,
 *              "lat":48.8687607
 *              }
 *          },
 *          "created":1457910000
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */