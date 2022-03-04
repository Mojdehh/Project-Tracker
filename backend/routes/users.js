const express = require("express");
const router = express.Router();
const { getUsers } = require("../helpers/dbHelpers.js");

/* GET users listing. */

module.exports = ({ getUsers }) => {
  router.get("/", (req, res) => {
    getUsers()
      .then((users) => res.json(users))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
