const router = require("express").Router();
const userRouter = require("./users");
const clothesRouter = require("./clothingItems");
const likesRouter = require("./likes");
const { login } = require("../controllers/login");
const { createUser } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const { authMiddleware } = require("../middlewares/auth");

router.use("/users", authMiddleware, userRouter);
router.use("/items", clothesRouter);
router.use("/items", authMiddleware, likesRouter);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) =>
  res.status(NOT_FOUND).json({ message: "Resource not found" })
);

module.exports = router;
