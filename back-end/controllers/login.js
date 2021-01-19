const connection = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { user, password } = req.body;
  const query = `SELECT * FROM users WHERE email='${user}' OR username='${user}'`;
  const data = [user, password];
  connection.query(query, data, async (err, result) => {
    const userInfo = result[0];
    if (err) throw err;
    if (userInfo) {
      if (await bcrypt.compare(password, userInfo.password)) {
        const { user_id, role, username, email, displayName } = userInfo;
        const payload = {
          user_id,
          role,
          email: email,
          username,
          displayName,
        };

        const options = {
          expiresIn: process.env.TOKEN_EXPIRATION,
        };

        const token = jwt.sign(payload, process.env.SECRET, options);
        res.json({ auth: true, token: token, name: userInfo.displayName });
      } else {
        res.status(400).json({ auth: false, message: "Invalid credentials" });
      }
    } else {
      res.status(400).json({
        auth: false,
        message: "No account with this email/username has been registered.",
      });
    }
  });
};

module.exports = login;
