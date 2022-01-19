const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
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
const addProjectUsersRouter = require("./routes/projects");
const getUsersRouter = require("./routes/users");
const addTicketRouter = require("./routes/tickets");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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
app.use("/api/projects", addProjectRouter(dbHelpers));
app.use("/api/users", getUsersRouter(dbHelpers));

module.exports = app;
