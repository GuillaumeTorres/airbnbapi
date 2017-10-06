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
