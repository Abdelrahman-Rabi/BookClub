const register = require("./register");
const login = require("./login");
const tokenIsValid = require("./tokenIsValid");
const users = require("./users");
const addToList = require("./addToList");
const getUserList = require("./getUserList");

module.exports = {
  register,
  login,
  tokenIsValid,
  users,
  addToList,
  getUserList,
};
