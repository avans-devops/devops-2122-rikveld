const express = require('express');
const router = express.Router(); //eslint-disable-line
const dbo = require('../services/database');


router.route('/').get((req, res) => {
  dbo.getDb().then(db => {
    db.collection('users')
        .find({}).limit(50)
        .toArray(function(err, result) {
          if (err) {
            console.log(err);
            // res.status(400).send('Error fetching users!');
          } else {
            res.json(result);
            console.log(result);
          }
        });
  },
  );
})
    .post((req, res) => {
      dbo.getDb().then(db => {
        db.collection('users')
            .insertOne(req.body, function(err, result) {
              if (err) {
                res.status(400).send('Error inserting user!');
              } else {
                res.status(204).send('Succesfully inserted user: ' + req.body);
              }
            });
      });
    });

module.exports = router;
