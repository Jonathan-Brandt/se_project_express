const router = require("express").Router();

router.get("/");
router.post("/:clothingId");
router.delete("/");

module.exports = router;
