const mongoose = require("mongoose");
const validator = require("validator");

const likeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.temId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  );

const dislikeItem = (req, res) =>
  ClothingItem.findByIdAndUpdate(
    req.params.temId,
    { $pull: { likes: req.user._id } },
    { new: true }
  );

module.exports = {
  likeItem,
  dislikeItem,
};
