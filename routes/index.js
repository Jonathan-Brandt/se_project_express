const router = require("express").Router();
const userRouter = require("./users");
const clothesRouter = require("./clothingItems");
const likesRouter = require("./likes");
const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothesRouter);
router.use("./likes", likesRouter);

res.status(NOT_FOUND).json({ message: "Resource not found" });

module.exports = router;
