const router = require("express").Router();

const { getCurrentUser, updateProfile } = require("../controllers/users");

const {
  validateUserInfoBody,
  validateAuthentication,
} = require("../middlewares/validation");

router.get("/me", validateUserInfoBody, getCurrentUser);
router.patch("/me", validateAuthentication, updateProfile);

module.exports = router;
