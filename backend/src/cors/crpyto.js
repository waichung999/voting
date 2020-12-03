const crypto = require('crypto');
const config = require('config')
const mode = process.env.NODE_ENV;

const algorithm = 'aes-256-ctr';
const secretKey = config.get(`${mode}.secretKey`)
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipher(algorithm, secretKey, iv);

  const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');

  return encrypted
};

const decrypt = (encrypted) => {
  const decipher = crypto.createDecipher(algorithm, secretKey);

  const decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');

  return decrypted;
};

module.exports = {
  encrypt,
  decrypt
};
