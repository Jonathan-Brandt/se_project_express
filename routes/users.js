const router = require("express").Router();

const { getCurrentUser, updateProfile } = require("../controllers/users");

const {
  validateUserInfoBody,
  validateAuthentication,
} = require("../middlewares/validation");
const { validate } = require("../models/clothingItem");

router.get("/me", validateUserInfoBody, getCurrentUser);
router.patch("/me", validateAuthentication, updateProfile);

module.exports = router;
