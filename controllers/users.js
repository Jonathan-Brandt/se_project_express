const getUsers = (req, res) => {
  res.send([{ name: "Joe :)" }, { name: "The Cooler Joe :)" }]);
};

const getUser = (req, res) => {
  const { userId } = req.params;
  res.send({ _id: userId, name: "Joe :)" });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  res.status(201).send({ name, avatar });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
