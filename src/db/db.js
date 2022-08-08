const mongoose = require("mongoose");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const { Role, User, Page } = require("../schemas");
const { ROLES } = require("./const");

const { DB_NAME, DB_PASS, DB_USERNAME, ADMIN_PASS, ADMIN_NAME } = process.env;

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASS}@cluster0.dd6uo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const checkOnExistRoles = function () {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && !count) {
      ROLES.forEach((name) => {
        new Role({ name }).save((err) => {
          if (err) {
            return console.log(`error`, err);
          }
          console.log(`added ${name} to roles collection`);
        });
      });
    } else {
      console.log("Roles exist");
    }
  });
};

const createAdminUser = function () {
  const userData = {
    name: ADMIN_NAME,
    password: bcrypt.hashSync(ADMIN_PASS, 8),
    roles: ["admin", "moderator", "user"],
  };

  const newUser = new User(userData);

  User.findOne({ name: ADMIN_NAME }, (err, res) => {
    if (!err && !res) {
      newUser.save(() => {
        Role.find({ name: { $in: userData.roles } }, (err, roles) => {
          console.log(userData.roles);

          if (err) {
            console.error("err", err);
            return;
          }

          newUser.roles = roles.map((role) => role._id);

          newUser.save((err) => {
            if (err) {
              console.log("err", err);
              return;
            }

            console.log("Admin created");
          });
        });
      });
    } else {
      console.log("Admin exist");
    }
  });
};

const db = {
  inited: false,
  mongoose: mongoose,

  connect: function () {
    this.mongoose
      .connect(uri)
      .then(() => console.log(`Connected to ${DB_NAME}`))
      .catch(() => console.log(`Failed connection to ${DB_NAME}`));

    return this;
  },

  _init() {
    if (!this.inited) {
      this.inited = true;

      this.connect();
      checkOnExistRoles();
      createAdminUser();
    }

    return this;
  },
  schemas: {
    User,
    Page,
    Role,
  },
};

db._init();

module.exports = db;
