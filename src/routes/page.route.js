const { Router } = require("express");
const {
  getPage,
  postPage,
  updatePage,
  removePage,
  getPages,
} = require("../controllers/page");

const router = Router();

router.get("/pages", getPages);
router.get("/page/:route", getPage);
router.post("/page", postPage);
router.put("/page/:route", updatePage);
router.delete("/page/:route", removePage);

module.exports = router;
