const express = require("express");
const router = express.Router();

const { login } = require("../helpers/dbHelpers.js");

/* Login user with information provided in the form */
module.exports = ({ login }) => {
  router.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });

  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    login(email, password)
      .then((user) => {
        if (!user) {
          res.status(401);
          return res.send({ message: "Wrong username/password combination!" });
        }
        req.session.user = user;
        res.json(user);
      })
      .catch((err) => res.send(err));
  });

  router.post("/logout", (req, res) => {
    req.session = null; // delete user cookies
    res.send({});
  });

  return router;
};
