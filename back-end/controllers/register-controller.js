const connection = require("../db");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const query = `INSERT INTO users (role_id,username,email,password,phone) 
    VALUES (2, ?, ?,?, ?)`;
  let { username, email, password, phone } = req.body;
  password = await bcrypt.hashSync(password, Number(process.env.SALT));
  const data = [username, email, password, phone];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.json(email + ` is already register.`);
    }

    res.json(data);
  });
};

module.exports = register;
