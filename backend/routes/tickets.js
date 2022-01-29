const express = require("express");
const router = express.Router();
const {
  getProjectTickets,
  getTicketComments,
  getTicketDetails,
  addTicket,
  addComment,
  editTicket,
} = require("../helpers/dbHelpers.js");

module.exports = ({
  getProjectTickets,
  getTicketComments,
  getTicketDetails,
  addTicket,
  addComment,
  editTicket,
}) => {
  router.get("/", (req, res) => {
    getProjectTickets()
      .then((tickets) => res.json(tickets))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:project_id/tickets/:ticket_id/comments", (req, res) => {
    const ticketID = req.params.ticket_id;
    getTicketComments(ticketID)
      .then((tickets) => res.json(tickets))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:project_id/tickets/:ticket_id", (req, res) => {
    const projectID = req.params.project_id;
    const ticketID = req.params.ticket_id;
    getTicketDetails(projectID, ticketID)
      .then((tickets) => res.json(tickets))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/:project_id", (req, res) => {
    const projectID = req.params.project_id;
    const userID = req.session.user.id;
    const description = req.body.description;
    const priority = req.body.priority;
    const name = req.body.ticketName;
    addTicket(name, description, priority, userID, projectID)
      .then((ticket) => res.json(ticket))
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });

  router.post("/:project_id/tickets/:ticket_id/comments", (req, res) => {
    const projectID = req.params.project_id;
    const ticketID = req.params.ticket_id;
    const userID = req.session.user.id;
    const comment = req.body.comment;
    addComment(comment, userID, ticketID)
      .then((comment) => res.json(comment))
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });

  router.put("/:project_id/tickets/:ticket_id", (req, res) => {
    const projectID = req.params.project_id;
    const ticketID = req.params.ticket_id;
    const userID = req.session.user.id;
    const name = req.body.name;
    const description = req.body.description;
    const priority = req.body.priority;
    const status = req.body.status;
    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();
    const dateTime = date + " " + time;
    editTicket(
      ticketID,
      name,
      description,
      priority,
      status,
      userID,
      projectID,
      dateTime
    )
      .then((ticket) => res.json(ticket))
      .catch((err) => {
        res.json({
          error: err.message,
        });
      });
  });
  return router;
};
