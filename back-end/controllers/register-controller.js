const connection = require("../db");
const bcrypt = require("bcrypt");

const register = (req, res) => {
  let { username, email, password, phone } = req.body;
  const checkEmail = `SELECT email FROM users WHERE email LIKE '${email}'`;
  connection.query(checkEmail, email, (err, result) => {
    console.log("RESULT : ", result);
    if (result.length !== 0) {
      res.json(email + ` is already register.`);
    } else {
      bcrypt.hash(password, Number(process.env.SALT), (err, hash) => {
        if (err) throw err;
        password = hash;
        const query = `INSERT INTO users (username,email,password,phone) 
        VALUES ( ?, ?,?, ?)`;
        const data = [username, email, password, phone];
        connection.query(query, data, (err, result) => {
          if (err) {
            console.log("ERR : ", err);
          }
          res.json(data);
        });
      });
    }
  });
};

module.exports = register;
