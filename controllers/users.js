const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");

const { BadRequestError } = require("../errors/badRequestError");
const { DefaultError } = require("../errors/defaultError");
const { NotFoundError } = require("../errors/notFoundError");
const { ConflictError } = require("../errors/conflictError");
const { AuthorizationError } = require("../errors/authError");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return next(new DefaultError("An error has occurred on the server"));
    });
};

const createUser = (req, res, next) => {
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
          return next(new BadRequestError("Invalid data provided"));
        }
        if (err.code === 11000) {
          return next(
            new ConflictError("Conflict error: please enter the proper email")
          );
        }
        return next(new DefaultError("An error has occurred on the server"));
      });
  });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Resource not found"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(new DefaultError("An error has occurred on the server"));
    });
};

const updateProfile = (req, res, next) => {
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
        return next(new NotFoundError("Resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(new DefaultError("An error has occurred on the server"));
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new NotFoundError("Resource not found"));
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
      if (err.message === "Incorrect email or password") {
        return next(
          new AuthorizationError(
            "The credentials do not match those in our records, please try again"
          )
        );
      }
      return next(new DefaultError("An error has occurred on the server"));
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  updateProfile,
  login,
};
