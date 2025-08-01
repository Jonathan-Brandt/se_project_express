const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth");

const {
  getClothing,
  postClothing,
  deleteClothing,
} = require("../controllers/clothingItems");

router.get("/", getClothing);
router.post("/", authMiddleware, postClothing);
router.delete("/:clothingId", authMiddleware, deleteClothing);

module.exports = router;
