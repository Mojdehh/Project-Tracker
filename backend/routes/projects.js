var express = require("express");
var router = express.Router();
const {
  getProjects,
  getProjectDetails,
  getProjectDetailsWithDevs,
  getProjectTickets,
  addProject,
  addProjectUsers,
  editProject,
  editUserProjects,
  getUser_ProjectIds,
  deleteUser_Project,
} = require("../helpers/dbHelpers.js");

/* GET all projects. */
module.exports = ({
  getProjects,
  getProjectDetails,
  getProjectDetailsWithDevs,
  getProjectTickets,
  addProject,
  addProjectUsers,
  editProject,
  editUserProjects,
  getUser_ProjectIds,
  deleteUser_Project,
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

  router.get("/:project_id/user_project", (req, res) => {
    const projectID = req.params.project_id;
    getUser_ProjectIds(projectID)
      .then((result) => res.json(result))
      .catch((err) =>
        res.status(500).json({
          error: err.message,
        })
      );
  });

  router.post("/", (req, res) => {
    const name = req.body.projectName;
    addProject(name)
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.put("/:project_id", (req, res) => {
    const projectID = req.params.project_id;
    const name = req.body.projectName;
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
    editProject(projectID, name, status, dateTime)
      .then((project) => res.json(project))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.post("/user_project", (req, res) => {
    const projectID = req.body.project_id;
    const userID = req.body.user_id;
    const projectTitle = req.body.project_name;
    addProjectUsers(userID, projectTitle, projectID)
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.put("/:project_id/user_project", (req, res) => {
    const projectID = req.body.project_id;
    const userID = req.body.user_id;
    const projectName = req.body.project_name;
    const id = req.body.user_project_id;
    editUserProjects(id, userID, projectName, projectID)
      .then((projects) => res.json(projects))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  router.delete("/:project_id/user_project", (req, res) => {
    const projectID = req.params.project_id;
    deleteUser_Project(projectID)
      .then((response) => res.json(response))
      .catch((err) =>
        res.json({
          error: err.message,
        })
      );
  });

  return router;
};
