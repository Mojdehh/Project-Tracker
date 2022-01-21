var express = require("express");
var router = express.Router();
const {

  login
} = require("../helpers/dbHelpers.js");

/* GET all projects. */
module.exports = ({
  
  login
}) => {
  router.post("/login", (req, res) => {
    console.log("hello")
    login()
    // .then(req.session.user_id = 1);
    .then((result) => {
                
      console.log(result);
      console.log(req.session);

    })
    
  })

  return router;
};
