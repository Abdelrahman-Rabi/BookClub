const connection = require("../db");

const getUserList = (req, res) => {
  const user_id = req.user.user_id;
  const query = `SELECT * FROM book_list WHERE user_id=${user_id}`;
  connection.query(query, user_id, (err, result) => {
    res.json(result);
  });
};

module.exports = getUserList;
