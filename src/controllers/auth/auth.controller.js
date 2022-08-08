const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createErrorResponse, createSuccessResponse } = require("../../utils");
const db = require("../../db/db");
const { AUTH_SECRET } = process.env;

const { User, Role } = db.schemas;

const signUp = async (req, res) => {
  const user = new User({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  await user.save((err, user) => {
    if (err) {
      createErrorResponse({ res, err, status: 500 });
      return;
    }

    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
        if (err) {
          createErrorResponse({ res, err, status: 500 });
          return;
        }

        user.roles = roles.map((role) => role._id);
        user.save((err) => {
          if (err) {
            createErrorResponse({ res, err, status: 500 });
            return;
          }

          createSuccessResponse({
            err,
            user,
            message: `${user.name} was registered successfully!`,
          });
        });
      });
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          createErrorResponse({ res, err, status: 500 });
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            createErrorResponse({ res, err, status: 500 });
            return;
          }

          createSuccessResponse({
            res,
            data: user,
            message: `${user.name} was registered successfully!`,
          });
        });
      });
    }
  });
};

const signIn = async (req, res) => {
  User.findOne({ name: req.body.name })
    .populate({ path: "roles", model: "role" })
    .exec((err, user) => {
      if (err) {
        createErrorResponse({ res, err, status: 500 });
        return;
      }
      if (!user) {
        createErrorResponse({
          res,
          err: { message: "User not found" },
          status: 404,
        });
        return;
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        createErrorResponse({
          res,
          err: { accessToken: null, message: "Invalid name or password" },
          status: 401,
        });
        return;
      }

      const token = jwt.sign({ id: user.id }, AUTH_SECRET, {
        expiresIn: 86400,
      });

      const authorities = [];

      user.roles.forEach((role) => {
        authorities.push(`ROLE_${role.name.toUpperCase()}`);
      });

      const userInfo = {
        name: user.name,
        roles: authorities,
        accessToken: token,
      };

      createSuccessResponse({
        res,
        data: userInfo,
        message: "User Info",
      });
    });
};

module.exports = {
  signIn,
  signUp,
};
