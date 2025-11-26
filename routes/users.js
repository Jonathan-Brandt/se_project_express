const router = require("express").Router();

const { getCurrentUser, updateProfile } = require("../controllers/users");

const {
  validateUserInfoBody,
  validateAuthentication,
} = require("../middlewares/validation");

router.get("/me", validateAuthentication, getCurrentUser);
router.patch("/me", validateUserInfoBody, updateProfile);

module.exports = router;
