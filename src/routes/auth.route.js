const { Router } = require("express");

const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth/auth.controller");

const router = Router();

router.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "jwt-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/auth/signup",
  [verifySignUp.checkRolesExisted],
  controller.signUp
);

router.post("/auth/signin", controller.signIn);

module.exports = router;
