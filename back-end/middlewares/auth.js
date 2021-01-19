const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      res
        .status(401)
        .json({ message: "No authentication token, authorization denied.." });
    const verified = jwt.verify(token, process.env.SECRET);
    if (!verified)
      res
        .status(401)
        .json({ message: "Token verification failed, authorization denied.." });
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
