const { Router } = require("express");
const { uploadPhoto } = require("../controllers/image/image.controller");
const imageUpload = require("express-fileupload");
const { authJwt } = require("../middlewares");

const router = Router();

const middlewares = [imageUpload(), authJwt.verifyToken];

router.post("/images/upload", middlewares, uploadPhoto);

module.exports = router;
