const router = require("express").Router();
const userRouter = require("./users");
const { authMiddleware } = require("../middlewares/auth");

const {
  getUsers,
  getCurrentUser,
  createUser,
} = require("../controllers/users");

router.get("/users/me", getCurrentUser, authMiddleware);

module.exports = router;
