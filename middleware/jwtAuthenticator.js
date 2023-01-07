const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {

  const cookie = req.headers.cookie;


  if(!cookie){
      return res.sendStatus(403)
  }
  const token = cookie.split("=")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = authenticateJWT;
