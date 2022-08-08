const { createErrorResponse } = require("../utils");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

const { AUTH_SECRET } = process.env;

const { User, Role } = db.schemas;

const verifyToken = (req, res, next) => {
  let token = req.headers[`jwt-access-token`];

  if (!token) {
    createErrorResponse({
      res,
      status: 401,
      err: { message: "No token provided!" },
    });
    return;
  }

  jwt.verify(token, AUTH_SECRET, (err, decoded) => {
    if (err) {
      createErrorResponse({
        res,
        err,
        status: 401,
      });
      return;
    }

    req.userId = decoded.id;

    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      createErrorResponse({ res, err, status: 500 });
      return;
    }

    Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) {
        createErrorResponse({ res, err, status: 500 });
        return;
      }

      roles.forEach((role) => {
        if (role.name === "admin") {
          next();
          return;
        }
      });

      createErrorResponse({
        res,
        err: { message: "Require Admin Role" },
        status: 401,
      });
      return;
    });
  });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      createErrorResponse({ res, err, status: 500 });
      return;
    }

    Role.find({ _id: { $in: user.roles } }, (err, roles) => {
      if (err) {
        createErrorResponse({ res, err, status: 500 });
        return;
      }
      roles.forEach((role) => {
        if (role.name === "moderator") {
          next();
          return;
        }
      });

      createErrorResponse({
        res,
        err: { message: "Require Admin Role" },
        status: 401,
      });
      return;
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
};

module.exports = authJwt;
