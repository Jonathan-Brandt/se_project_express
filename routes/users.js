const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth");

const {
  getUsers,
  getCurrentUser,
  createUser,
} = require("../controllers/users");

router.get("/users/me", getCurrentUser, authMiddleware);
router.patch("/users/me", updateProfile);

module.exports = router;
