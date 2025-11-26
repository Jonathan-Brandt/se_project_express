const router = require("express").Router();

const { authMiddleware } = require("../middlewares/auth");
const {
  validateCardBody,
  validateClothingId,
  validateItemId,
} = require("../middlewares/validation");

const {
  getClothing,
  postClothing,
  deleteClothing,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothing);
router.post("/", validateCardBody, authMiddleware, postClothing);
router.delete(
  "/:clothingId",
  validateClothingId,
  authMiddleware,
  deleteClothing
);

router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, dislikeItem);

module.exports = router;
