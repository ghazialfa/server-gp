const jwt = require('jsonwebtoken');
const User = require('../model/user');

async function authentication(req, res, next) {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) throw { name: `invalidToken` };
    const token = access_token.split(' ')[1];
    if (!token) throw { name: 'invalidToken' };
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) throw { name: 'invalidToken' };
    const user = await User.findById(payload.userId).select('-password');
    if (!user) throw { name: 'invalidToken' };
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
