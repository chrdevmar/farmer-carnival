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
  try {
    // Decode the JWT token
    var verifiedToken = jwt.verify(req.body.token, process.env.SECRET_KEY);
    // Prevent negative or 0 values
    if(req.body.amount <= 0) {
      res.status(500).send({
        "error": "Subtracted amount cannot be less than 1"
      })
      return;
    }
    // Subtract the amount spent from the user's current balance
    var newBalance = verifiedToken.balance - req.body.amount;
    // Generate & send new token with updated balance
    var token = jwt.sign({
      balance: newBalance
    }, process.env.SECRET_KEY,
    {
      expiresIn: "2h"
    })
    res.send(token);
  } catch(err) {
    res.status(500).send({
      "error": err
    })
    return;
  }
})

app.listen(8000);
console.log('listening on port 8000')
