const db = require("../db/db");
const { ROLES } = require("../db/const");
const { createErrorResponse } = require("../utils");

const checkRolesExisted = (req, res, next) => {
  const receivedRoles = req.body.roles;

  if (receivedRoles) {
    receivedRoles.forEach((role) => {
      if (!ROLES.includes(role)) {
        createErrorResponse({ res, err: `Role ${role} does not exist` });
      }
      return;
    });
  }
  next();
};

module.exports = { checkRolesExisted };
