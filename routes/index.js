var express = require('express');
var nodemailer = require('nodemailer');
var xoauth2 = require("xoauth2"), xoauth2gen;
var oauth = require('../configure/oauth');
var gmail = require('../configure/gmail');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

console.log(oauth.username);
console.log(gmail.refresh_token);

xoauth2gen = require('xoauth2').createXOAuth2Generator({
  user: oauth.username,
  clientId: oauth.clientId,
  clientSecret: oauth.clientSecret,
  refreshToken: gmail.refresh_token,
  accessToken: gmail.access_token // optional
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

  var mailOptions = {
    from: 'no-reply@uppercaseyvr.com', // sender address
    to: 'huiquanlu@gmail.com', // list of receivers
    subject: 'Uppercase Contact Email', // Subject line
    text: text //, // plaintext body
    // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
  };

  transporter.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log('Message sent');
      res.send('Okay');
    }
  });
})

module.exports = router;
