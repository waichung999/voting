const jwt = require('jsonwebtoken');
const reqResponse = require('./responseHandler');


const checkToken = (req, res, next) =>{
  const token = req.headers.token;
  if (token) {
    const key = 'secret'
    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.status(414).send(reqResponse.errorResponse(414));
      } else {
        if (key === 'secret') {
          decoded.isAdminUser = false;
        } else {
          decoded.isAdminUser = true;
        }
        req.user = decoded.user;
        next();
      }
    });
  } else {
    return res.status(401).send(reqResponse.errorResponse(401));
  }

}
module.exports = {
  checkToken,
}
