const express = require('express');
const router = express.Router();
const { getProjectTickets } = require('../helpers/dbHelpers.js');

/* GET all projects. */
module.exports = ({getProjectTickets}) => {
  router.get('/', (req, res) => {
    getProjectTickets()
      .then((tickets) => res.json(tickets))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  // router.get('/details', (req, res) => {
  //   getProjectDetails()
  //     .then((projects) => res.json(projects))
  //     .catch((err) => res.json({
  //       error: err.message
  //     }));
  // });

  return router;
}
