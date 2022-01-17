const express = require('express');
const router = express.Router();
const { getProjectTickets, getTicketComments, getTicketDetails } = require('../helpers/dbHelpers.js');

/* GET all projects. */
module.exports = ({getProjectTickets, getTicketComments, getTicketDetails}) => {
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

  router.get('/tickets/:ticket_id', (req, res) => {
    const ticketID = req.params.ticket_id;
    getTicketComments(ticketID)
      .then((tickets) => res.json(tickets))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  router.get('/:project_id/tickets/:ticket_id', (req, res) => {
    const projectID = req.params.project_id;
    const ticketID = req.params.ticket_id;
    getTicketDetails(ticketID)
      .then((tickets) => res.json(tickets))
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
}
