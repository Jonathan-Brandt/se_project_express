const clothingItem = require("../models/clothingItem");

const { BadRequestError } = require("../errors/badRequestError");
const { DefaultError } = require("../errors/defaultError");
const { NotFoundError } = require("../errors/notFoundError");
const { ForbiddenError } = require("../errors/forbiddenError");

const getClothing = (req, res) => {
  clothingItem
    .find({})
    .then((clothing) => res.status(200).send(clothing))
    .catch((err) => {
      console.error(err);
      throw new DefaultError("An error has occurred on the server");
    });
};

const postClothing = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((createdItem) => res.status(201).send(createdItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        throw new BadRequestError("Invalid data provided");
      }
      throw new DefaultError("An error has occurred on the server");
    });
};

const deleteClothing = (req, res) => {
  const { _id } = req.user;
  const { clothingId } = req.params;
  clothingItem
    .findById(clothingId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== _id) {
        throw new ForbiddenError("You are not allowed to access this data");
      }

      return item
        .deleteOne()
        .then(() => res.status(200).send({ message: "Item deleted" }));
    })
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
const likeItem = (req, res) =>
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail()
    .then((user) => res.status(201).send(user))
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

const dislikeItem = (req, res) =>
  clothingItem
    .findByIdAndUpdate(
      req.params.itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
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

module.exports = {
  getClothing,
  postClothing,
  deleteClothing,
  likeItem,
  dislikeItem,
};
