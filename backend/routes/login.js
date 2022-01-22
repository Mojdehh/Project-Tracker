const express = require("express");
const router = express.Router();

const {
  login
} = require("../helpers/dbHelpers.js");

/* Login user with information provided in the form */
module.exports = ({
  login
}) => {
  router.post("/login", (req, res) => {
    console.log('req.session', req.session);
    const {email, password} = req.body;
    login(email, password)
    .then(user => {
      if (!user) {
        res.status(401);
        return res.send('User not found! please try again!')
      }
      req.session.user = user;
      // console.log("req.session.user ", req.session.user );
      res.json(user);

    })
    .catch(err => res.send(err));
    
  })

  return router;
};
