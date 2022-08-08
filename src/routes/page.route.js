const { Router } = require("express");
const {
  getPage,
  postPage,
  putPage,
  removePage,
  getPages,
} = require("../controllers/page");
const { authJwt } = require("../middlewares");

const router = Router();

router.get("/pages", getPages);
router.get("/page/:route", getPage);
router.post("/page", [authJwt.verifyToken], postPage);
router.put("/page/:route", [authJwt.verifyToken], putPage);
router.delete("/page/:route", [authJwt.verifyToken], removePage);

module.exports = router;
