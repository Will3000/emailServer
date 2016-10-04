var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require("xoauth2"), xoauth2gen;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

xoauth2gen = require('xoauth2').createXOAuth2Generator({
  user: process.env.username,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  refreshToken: process.env.refresh_token,
  accessToken: process.env.access_token // optional
});

// HTTP
xoauth2gen.getToken(function(err, token, accessToken){
    if(err){
        return console.log(err);
    }
    console.log("HTTP getToken method Authorization: Bearer " + accessToken);
});


xoauth2gen.on("token", function(token){
  console.log("User: ", token.user); // e-mail address
  console.log("New access token: ", token.accessToken);
  console.log("New access token timeout: ", token.timeout); // TTL in seconds
});

router.post('/email',function(req, res){
  var transporter = nodemailer.createTransport(({
    service: 'gmail',
    auth: {
      xoauth2: xoauth2gen
    }
  }));

  var text = 'name: ' + req.body.name + "\n"
              + 'email: ' + req.body.email + "\n"
              + 'phone: ' + req.body.phone + "\n"
              + 'message: ' + req.body.message;

  var receiversList = ['huiquanlu@gmail.com', 'salmansalem9022@gmail.com', 'leehyangnim@hotmail.com', 'tong.yvr@gmail.com', 'philipskenan@gmail.com','info@uppercaseyvr.com']

  var message = "okay";

  receiversList.forEach(function(receiver){
    transporter.sendMail({
      from: 'no-reply@uppercaseyvr.com', // sender address
      to: receiver, // list of receivers
      subject: 'Uppercase Contact Email', // Subject line
      text: text //, // plaintext body
    }, function(error, response) {
      if (error) {
        message = "Failed to send";
      } else {
        message = "Message Sent";
      }
    });
  })
  res.send(message);
})

module.exports = router;
