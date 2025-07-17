const router = require("express").Router();
const userRouter = require("./users");
const clothesRouter = require("./clothingItems");
const likesRouter = require("./likes");
const loginRouter = require("./");
const { NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothesRouter);
router.use("/items", likesRouter);

router.use((req, res) =>
  res.status(NOT_FOUND).json({ message: "Resource not found" })
);

module.exports = router;
