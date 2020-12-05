const crypto = require('crypto');
const config = require('config')
const mode = process.env.NODE_ENV;

const secretKey = config.get(`${mode}.secretKey`)

const encrypt = (text) => {

  const cipher = crypto.createCipher('aes192', secretKey);

  var crypted = cipher.update(text, 'utf8', 'hex');

  crypted += cipher.final('hex');

  return crypted;
};

const decrypt = (encrypted) => {
  const decipher = crypto.createDecipher('aes192', secretKey);

  var decrypted = decipher.update(encrypted, 'hex', 'utf8');

  decrypted += decipher.final('utf8');

  return decrypted;
};

module.exports = {
  encrypt,
  decrypt
};
