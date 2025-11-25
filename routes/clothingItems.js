const router = require("express").Router();

const { authMiddleware } = require("../middlewares/auth");
const { validateCardBody, validateID } = require("../middlewares/validation");

const {
  getClothing,
  postClothing,
  deleteClothing,
} = require("../controllers/clothingItems");
const { likeItem, dislikeItem } = require("../controllers/clothingItems");

router.get("/", getClothing);
router.post("/", validateCardBody, authMiddleware, postClothing);
router.delete("/:clothingId", validateID, authMiddleware, deleteClothing);

router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
