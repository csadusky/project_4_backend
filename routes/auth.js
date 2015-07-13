var api = require('instagram-node').instagram();

// app.configure(function() {
//   client_id: process.env.YOUR_CLIENT_ID,
//   client_secret: process.env.YOUR_CLIENT_SECRET
// });

api.use({
  client_id: process.env.YOUR_CLIENT_ID,
  client_secret: process.env.YOUR_CLIENT_SECRET
});

var redirect_uri = 'https://fast-brook-4146.herokuapp.com/auth';

authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri));
};

handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};

// This is where you would initially send users to authorize
app.get('/', authorize_user);
// This is your redirect URI
app.get('/auth', handleauth);

