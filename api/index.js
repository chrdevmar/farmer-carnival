require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('Hello world');
})

// Route for commiting the user's donation balance & generating a JWT with this balance
app.post('/commit', (req, res) => {
  // Check if body contains a balance
  if(req.body.balance) {
    // Generate JWT
    var token = jwt.sign({
      balance: req.body.balance
    }, process.env.SECRET_KEY,
    {
      expiresIn: "2h"
    })
    // Send JWT
    res.send(token);
  } else {
    res.status(500).send({
      "error": "Invalid balance received. Balance must be a number and greater than 0."
    });
  }
})

app.post('/spend', (req, res) => {

})

app.listen(8000);
console.log('listening on port 8000')
