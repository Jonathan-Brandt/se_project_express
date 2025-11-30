const router = require("express").Router();
const userRouter = require("./users");
const clothesRouter = require("./clothingItems");
const { login } = require("../controllers/users");
const { createUser } = require("../controllers/users");

const { validateSignIn, validateSignUp } = require("../middlewares/validation");
const { NotFoundError } = require("../errors/notFoundError");

router.use("/users", userRouter);
router.use("/items", clothesRouter);

router.post("/signin", validateSignIn, login);
router.post("/signup", validateSignUp, createUser);

router.use((req, res, next) => next(new NotFoundError("Resource not found")));

module.exports = router;
