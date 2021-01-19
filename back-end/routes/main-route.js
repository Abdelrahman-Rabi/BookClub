const express = require("express");
const auth = require("../middlewares/auth");
const mainRouter = express.Router();
const {
  register,
  login,
  tokenIsValid,
  users,
} = require("../controllers/main-controller");

mainRouter.get("/", (req, res) => {
  res.json("HELLO WORLD");
});

mainRouter.post("/register", register);
mainRouter.post("/login", login);
mainRouter.post("/users/tokenisvalid", tokenIsValid);
mainRouter.get("/users", auth, users);

module.exports = mainRouter;
