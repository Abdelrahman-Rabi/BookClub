const express = require("express");
const auth = require("../middlewares/auth");
const mainRouter = express.Router();
const {
  register,
  login,
  tokenIsValid,
  users,
  addToList,
  getUserList,
  removeFromList,
} = require("../controllers/main-controller");

mainRouter.get("/", (req, res) => {
  res.json("HELLO WORLD");
});

mainRouter.post("/register", register);
mainRouter.post("/login", login);
mainRouter.post("/users/tokenisvalid", tokenIsValid);
mainRouter.get("/users", auth, users);

/** Book List  ****/
mainRouter.post("/book-page/:book_id", auth, addToList);
mainRouter.get("/book-list/:user_id", auth, getUserList);
mainRouter.delete("/book-list/:user_id", auth, removeFromList);

module.exports = mainRouter;
