const router = require("express").Router();
const userRouter = require("./users");
const clothesRouter = require("./clothingItems");
const { login } = require("../controllers/users");
const { createUser } = require("../controllers/users");
const { NOT_FOUND } = require("../utils/errors");
const { validateSignIn, validateSignUp } = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", clothesRouter);

router.post("/signin", validateSignIn, login);
router.post("/signup", validateSignUp, createUser);

router.use((req, res) =>
  res.status(NOT_FOUND).json({ message: "Resource not found" })
);

module.exports = router;
