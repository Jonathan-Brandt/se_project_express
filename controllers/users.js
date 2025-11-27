const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const { BadRequestError } = require("../errors/badRequestError");
const { DefaultError } = require("../errors/defaultError");
const { NotFoundError } = require("../errors/notFoundError");
const { ConflictError } = require("../errors/conflictError");
const { AuthorizationError } = require("../errors/authError");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      throw new DefaultError("An error has occurred on the server");
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, avatar, email, password: hash })
      .then((user) => {
        const userObj = user.toObject();
        delete userObj.password;
        return res.status(201).send(userObj);
      })
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          throw new BadRequestError("Invalid data provided");
        }
        if (err.code === 11000) {
          throw new ConflictError(
            "Conflict error: please enter the proper email"
          );
        }
        throw new DefaultError("An error has occurred on the server");
      });
  });
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        throw new NotFoundError("Resource not found");
      }
      if (err.name === "ValidationError") {
        throw new BadRequestError("Invalid data provided");
      }
      throw new DefaultError("An error has occurred on the server");
    });
};

const updateProfile = (req, res) => {
  const { _id } = req.user;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true, context: "query" }
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        throw new NotFoundError("Resource not found");
      }
      if (err.name === "CastError") {
        throw new BadRequestError("Invalid data provided");
      }
      throw new DefaultError("An error has occurred on the server");
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new NotFoundError("Resource not found");
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "invalid emal or password") {
        throw new AuthorizationError(
          "The credentials do not match those in our records, please try again"
        );
      }
      throw new DefaultError("An error has occurred on the server");
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  updateProfile,
  login,
};
