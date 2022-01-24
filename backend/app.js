const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const logger = require("morgan");
const db = require("./db");
const dbHelpers = require("./helpers/dbHelpers")(db);
const cors = require("cors");

const projectsRouter = require("./routes/projects");
const projectDetailsRouter = require("./routes/projects");
const projectTicketsRouter = require("./routes/tickets");
const projectDetailsWithDevsRouter = require("./routes/projects");
const getTicketCommentsRouter = require("./routes/tickets");
const getTicketDetailsRouter = require("./routes/tickets");
const addProjectRouter = require("./routes/projects");
const editProjectRouter = require("./routes/projects");
const addProjectUsersRouter = require("./routes/projects");
const getUsersRouter = require("./routes/users");
const addTicketRouter = require("./routes/tickets");
const addCommentRouter = require("./routes/tickets");
const addLoginRouter = require("./routes/login");
const editTicketRouter = require("./routes/tickets");
const editUserProjectsRouter = require("./routes/projects");
const deleteUser_ProjectRouter = require("./routes/projects");
const getUser_ProjectIdsRouter = require("./routes/projects");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/projects", projectsRouter(dbHelpers));
app.use("/api/projects", projectDetailsRouter(dbHelpers));
app.use("/api/projects", projectTicketsRouter(dbHelpers));
app.use("/api/projects", projectDetailsWithDevsRouter(dbHelpers));
app.use("/api/projects", getTicketDetailsRouter(dbHelpers));
app.use("/api/projects", getTicketCommentsRouter(dbHelpers));
app.use("/api/projects", addProjectRouter(dbHelpers));
app.use("/api/projects", addProjectUsersRouter(dbHelpers));
app.use("/api/projects", editProjectRouter(dbHelpers));
app.use("/api/projects", addTicketRouter(dbHelpers));
app.use("/api/users", getUsersRouter(dbHelpers));
app.use("/api/projects", addCommentRouter(dbHelpers));
app.use("/api", addLoginRouter(dbHelpers));
app.use("/api/projects", editTicketRouter(dbHelpers));
app.use("/api/projects", editUserProjectsRouter(dbHelpers));
app.use("/api/projects", deleteUser_ProjectRouter(dbHelpers));
app.use("/api/projects", getUser_ProjectIdsRouter(dbHelpers));

module.exports = app;
