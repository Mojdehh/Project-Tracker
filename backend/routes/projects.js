var express = require('express');
var router = express.Router();
const { getProjects, getProjectDetails } = require('../helpers/dbHelpers.js');

/* GET all projects. */
module.exports = ({getProjects, getProjectDetails}) => {
  router.get('/', (req, res) => {
    getProjects()
      .then((projects) => res.json(projects))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.get('/details', (req, res) => {
    getProjectDetails()
      .then((projects) => res.json(projects))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
}
