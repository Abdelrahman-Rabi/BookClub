const connection = require("../db");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  let { username, email, password, phone, country, role } = req.body;
  const checkEmail = `SELECT email,username FROM users WHERE email='${email}' OR username='${username}'`;
  connection.query(checkEmail, [email, username], (err, result) => {
    if (result.length !== 0) {
      // email is already registered in Database
      res.json(false);
    } else {
      bcrypt.hash(password, Number(process.env.SALT), (err, hash) => {
        if (err) throw err;
        password = hash;
        const query = `INSERT INTO users (username,email,password,phone,country,role) 
        VALUES ( ?, ?, ?, ?, ?,?)`;
        const data = [username, email, password, phone, country, role];
        connection.query(query, data, (err, result) => {
          if (err) {
            console.log("ERR : ", err);
          }
          res.json(true);
        });
      });
    }
  });
};

module.exports = register;
