const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth");

const {
  getUsers,
  getCurrentUser,
  createUser,
} = require("../controllers/users");
const { findByIdAndUpdate } = require("../models/user");
const { useImperativeHandle } = require("react");

router.get("/users/me", authMiddleware, getCurrentUser);
router.patch("/users/me", authMiddleware);

module.exports = router;
