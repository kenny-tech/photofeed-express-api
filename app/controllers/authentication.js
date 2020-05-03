const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  //Find the user associated with the email provided by the user
  const user = await User.findOne({ email });

  if( user===null ){
    //If the user isn't found in the database, return a message
    return res.status(422).send({ error: 'Invalid Email or Password'});
  }
  
  //Validate password and make sure it matches with the corresponding hash stored in the database
  //If the passwords match, it returns a value of true.
  const validate = await user.isValidPassword(password);
    
  if( !validate ){
    //If the user isn't found in the database, return a message
    return res.status(422).send({ error: 'Invalid Email or Password'});
  }
  
  // User email and password is valid
  // Send the user a token
  res.status(200).send({ 
    success: true,
    user: {
      id: user.id,
      email: user.email,
      token: tokenForUser(user) 
    },
    message: 'success',
  });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email already taken' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if (err) { return next(err); }

      // Respond to request indicating the user was created
      res.status(200).send({ 
        success: true,
        user: {
          id: user.id,
          email: user.email,
        },
        message: 'Registration successful',
      });
    });
  });
}
