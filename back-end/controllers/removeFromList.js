const connection = require("../db");

const removeFromList = (req, res) => {
  const user_id = req.user.user_id;
  const book_id = req.body.book_id;
  const data = [user_id, book_id];
  const removeBook = `DELETE FROM book_list WHERE user_id=${user_id} AND book_id='${book_id}'`;
  connection.query(removeBook, data, (err, result) => {
    res.json(result);
  });
};

module.exports = removeFromList;
