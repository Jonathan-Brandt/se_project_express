const router = require("express").Router();
const userRouter = require("./users");
const clothesRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/clothingItems", clothesRouter);

module.exports = router;
