const { Router } = require("express");
const page = require("./page.route");

const router = Router();

router.use(page);

module.exports = router;
