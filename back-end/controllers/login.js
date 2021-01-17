const connection = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const query = `SELECT * FROM users WHERE email=? OR username=?`;

  const { email, username, password } = req.body;
  const data = [email, username, password];
  connection.query(query, data, async (err, result) => {
    if (err) throw err;
    console.log("result :", result[0]);
    if (result.length) {
      if (await bcrypt.compare(password, result[0].password)) {
        const { user_id, role_id, username, email, phone } = result[0];
        const payload = {
          user_id,
          role_id,
          email: email,
          username,
          phone,
        };

        const options = {
          expiresIn: process.env.TOKEN_EXPIRATION,
        };

        const token = jwt.sign(payload, process.env.SECRET, options);
        res.json(token);
      } else {
        // res.status(422);
        res.json("Invalid login check your password");
      }
    } else {
      // res.status(404);
      res.json("Invalid login check your email or username");
    }
  });
};

module.exports = login;
