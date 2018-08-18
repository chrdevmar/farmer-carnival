require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// User's balance
var balance = 0;

app.get('/', (req, res, next) => {
  res.send('Hello world');
})

app.post('/commit', (req, res) => {
  // Update user's balance
  balance = req.body.balance;
  // Generate JWT
  var token = jwt.sign({
    balance: balance
  }, process.env.SECRET_KEY,
  {
    expiresIn: "2h"
  })
  // Send JWT
  res.send(token);
})



app.listen(8000);
console.log('listening on port 8000')
