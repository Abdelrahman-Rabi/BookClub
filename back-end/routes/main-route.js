const express = require("express");
const mainRouter = express.Router();
const { register } = require("../controllers/main-controller");

mainRouter.get("/", (req, res) => {
  res.json("HELLO WORLD");
});

mainRouter.post("/register", register);

module.exports = mainRouter;
