const { User } = require('../models');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body);
      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      console.log('error from catch: ', err);
      res.status(400).send({
        error: 'This email account is already in use.'
      });
    }
  },
  async login (req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({
        where: {
          email: email
        }
      });

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        });
      }

      const isPasswordValid = await user.comparePassword(password);
      console.log('log for isPasswordValid: ', isPasswordValid);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The password information was incorrect'
        });
      }

      const userJson = user.toJSON();
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      });
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      });
    }
  }
};
