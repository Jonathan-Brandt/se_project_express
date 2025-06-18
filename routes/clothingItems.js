const router = require("express").Router();

router.get("/");
router.post("/:clothingId");
router.delete("/:clothingId");

module.exports = router;
