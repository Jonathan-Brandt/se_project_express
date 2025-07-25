const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth");

const {
  getUsers,
  getCurrentUser,
  createUser,
  updateProfile,
} = require("../controllers/users");

router.get("/users/me", authMiddleware, getCurrentUser);
router.patch("/users/me", authMiddleware, updateProfile);

module.exports = router;
