var express = require("express");
var router = express.Router();
const {
  getProjects,
  getProjectDetails,
  getProjectDetailsWithDevs,
  getProjectTickets,
  addProject,
  addProjectUsers,
} = require("../helpers/dbHelpers.js");

/* GET all projects. */
module.exports = ({
  getProjects,
  getProjectDetails,
  getProjectDetailsWithDevs,
  getProjectTickets,
  addProject,
  addProjectUsers,
}) => {
  router.get("/", (req, res) => {
    getProjects()
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/details", (req, res) => {
    getProjectDetails()
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/details/devs", (req, res) => {
    getProjectDetailsWithDevs()
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:project_id", (req, res) => {
    const projectID = req.params.project_id;
    getProjectDetailsWithDevs(projectID)
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.get("/:project_id/tickets", (req, res) => {
    const projectID = req.params.project_id;
    getProjectTickets(projectID)
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.status(500).json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    const name = req.body.projectName;
    console.log("name: ", name);
    addProject(name)
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/users", (req, res) => {
    const projectID = req.body.project_id;
    const userID = req.body.user_id;
    const projectTitle = req.body.project_name;
    console.log("projectID and userID: ", projectID, userID);
    addProjectUsers(userID, projectTitle, projectID)
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
