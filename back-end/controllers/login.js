const connection = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { user, password } = req.body;
  const query = `SELECT * FROM users WHERE email='${user}' OR username='${user}'`;
  const data = [user, password];
  connection.query(query, data, async (err, result) => {
    if (err) throw err;
    console.log("result :", result[0]);
    if (result.length) {
      if (await bcrypt.compare(password, result[0].password)) {
        const { user_id, role, username, email, phone, country } = result[0];
        const payload = {
          user_id,
          role,
          email: email,
          username,
          phone,
          country,
        };

        const options = {
          expiresIn: process.env.TOKEN_EXPIRATION,
        };

        const token = jwt.sign(payload, process.env.SECRET, options);
        res.json({ auth: true, token: token });
      } else {
        // res.status(422);
        res.json({ auth: false, message: "Invalid login check your password" });
      }
    } else {
      // res.status(404);
      res.json({
        auth: false,
        message: "Invalid login check your email or username",
      });
    }
  });
};

module.exports = login;
