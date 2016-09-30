# emailServer
Mailer Service for Uppercase

Run <code>npm install</code> after pulling

Create your own configure folder that contains gmail.js and oauth.js

inside gmail.js:
<code>
module.exports = {
  "access_token": "xxx",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "xxx"
} 
</code>

inside oauth.js:
<code>
module.exports = {
  username: "example@gmail.com",
  clientId: "xxx.apps.googleusercontent.com",
  clientSecret:"xxx"
};
</code>
