const users = async (req, res) => {
  const userData = req.user;
  res.json(userData.displayName);
};

module.exports = users;
