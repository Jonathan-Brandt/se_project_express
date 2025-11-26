const router = require("express").Router();

const { authMiddleware } = require("../middlewares/auth");
const { validateCardBody, validateID } = require("../middlewares/validation");

const {
  getClothing,
  postClothing,
  deleteClothing,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.get("/", getClothing);
router.post("/", validateCardBody, authMiddleware, postClothing);
router.delete("/:clothingId", validateID, authMiddleware, deleteClothing);

router.put("/:itemId/likes", validateID, likeItem);
router.delete("/:itemId/likes", validateID, dislikeItem);

module.exports = router;
