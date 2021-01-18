const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const token = req.headers.authorization.split(" ").pop();
  if (!token) {
    res.send({ message: "we need a token" });
  } else {
    jwt.verify(token, process.env.SECRET, (err, parsedToken) => {
      if (err) {
        res.send({ auth: false, message: "U failed to authenticate" });
      } else {
        req.token = parsedToken;
        next();
      }
    });
  }
};
