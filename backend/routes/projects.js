var express = require('express');
var router = express.Router();
const { getProjects } = require('../helpers/dbHelpers.js');

/* GET all projects. */
module.exports = ({getProjects}) => {
  router.get('/', (req, res) => {
    getProjects()
      .then((projects) => res.json(projects))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
}
