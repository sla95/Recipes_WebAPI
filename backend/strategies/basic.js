const BasicStrategy = require('passport-http').BasicStrategy;
const users = require('../models/users');
const bcrypt = require('bcrypt');

const verifyPassword = function (user, password) {
  // compare user.password with the password supplied
  return bcrypt.compareSync(password, user.password);
}

const checkUserAndPass = async (username, password, done) => {
  // look up the user and check the password if the user exists
  // call done() with either an error or the user, depending on outcome
  let result;

  try {
    result = await users.findByUsername(username);
  } catch (error) {
    console.error(`Error during authentication for user ${user.username}`);
    return done(error);
  }

  if (result.length) {
    const user = result[0];
    if (verifyPassword(user, password)) {
      console.log(`Successfully authenticated user ${user.username}`);
      return done(null, user);
    } else {
      console.log(`Password incorrect for user ${user.username}`);
    }
  } else {
    console.log(`No user found with username ${user.username}`);
  }
  return done(null, false); // incorrect username and password
}

const strategy = new BasicStrategy(checkUserAndPass);
module.exports = strategy;

// basic strategy to make sure login details are correct