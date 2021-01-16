const express = require("express");
const mainRouter = express.Router();
const { register, login } = require("../controllers/main-controller");

mainRouter.get("/", (req, res) => {
  res.json("HELLO WORLD");
});

mainRouter.post("/register", register);
mainRouter.post("/login", login);

module.exports = mainRouter;
