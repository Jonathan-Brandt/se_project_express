const router = require("express").Router();
const {
  getClothing,
  postClothing,
  deleteClothing,
} = require("../controllers/clothingItems");

router.get("/", getClothing);
router.post("/", postClothing);
router.delete("/:clothingId", deleteClothing);

module.exports = router;
