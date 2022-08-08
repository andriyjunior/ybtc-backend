const { Router } = require("express");
const page = require("./page.route");
const auth = require("./auth.route");
const image = require("./image.route");

const router = Router();

router.use(page);
router.use(auth);
router.use(image);

module.exports = router;
