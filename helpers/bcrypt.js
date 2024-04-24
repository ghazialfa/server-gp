const bcrypt = require('bcryptjs');
function bcryptData(value) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(value, salt);
  return hash;
}

function comparePassword(value, password) {
  let result = bcrypt.compareSync(value, password);
  return result;
}

module.exports = { bcryptData, comparePassword };
