const connection = require("../db");

const addToList = (req, res) => {
  const user_id = req.user.user_id;
  const book_id = req.params.book_id;
  const list = req.body.listName;
  const data = [user_id, list, book_id];
  const checkBook = `SELECT * FROM book_list WHERE user_id=${user_id} AND book_id='${book_id}'`;
  connection.query(checkBook, data, (err, result) => {
    if (result[0]) {
      const list_id = result[0].book_list_id;
      const data = [list_id, list];
      const updateList = `UPDATE book_list SET listName='${list}' WHERE book_list_id=${list_id}`;
      connection.query(updateList, data, (err, result) => {
        res.json(result);
      });
    } else {
      const insertBook = `INSERT INTO book_list (user_id,listName,book_id) VALUES (?,?,?)`;
      const data = [user_id, list, book_id];
      connection.query(insertBook, data, (err, result) => {
        res.json(result);
      });
    }
  });
};

module.exports = addToList;
