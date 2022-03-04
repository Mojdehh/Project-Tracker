const bcrypt = require("bcryptjs");

module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT users.full_name, users.id from users;",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getProjects = () => {
    const query = {
      text: "SELECT * FROM projects;",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getProjectDetails = () => {
    const query = {
      text: `SELECT projects.*, count(tickets.*) 
          as number_of_tickets FROM projects 
          FULL OUTER JOIN tickets ON projects.id = project_id 
          GROUP BY projects.id
          ORDER BY date_created DESC;`,
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getProjectDetailsWithDevs = (id) => {
    const query = {
      text: `SELECT projects.*, users.full_name as devs 
            FROM projects
            JOIN user_project ON projects.id = project_id
            JOIN users ON users.id = user_id  WHERE projects.id = $1 
            GROUP BY users.full_name, projects.id;`,
    };
    const values = [id];
    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getProjectUsers = () => {
    const query = {
      text: `SELECT users.full_name as name 
          FROM users 
          JOIN user_project ON user_id = users.id 
          JOIN projects ON project_id = projects.id 
          WHERE project_id = $1;`,
      values: $1,
    };
    const values = [];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getProjectTickets = (id) => {
    const query = {
      text: `SELECT * FROM tickets WHERE project_id = $1
      ORDER BY date_created DESC;`,
    };
    const values = [id];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getTicketComments = (id) => {
    const query = {
      text: `SELECT comments.*, users.full_name as username FROM comments 
            JOIN users ON users.id = user_id 
            WHERE ticket_id = $1
            ORDER BY date_created DESC;`,
    };
    const values = [id];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getTicketDetails = (project_id, ticket_id) => {
    const query = {
      text: `SELECT tickets.*, users.full_name as Username FROM tickets 
      JOIN users ON users.id = user_id 
      WHERE project_id = $1 AND tickets.id = $2;`,
    };
    const values = [project_id, ticket_id];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUser_ProjectIds = (project_id) => {
    const query = {
      text: `SELECT * FROM user_project WHERE project_id = $1;`,
    };
    const values = [project_id];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addProject = (name) => {
    const query = {
      text: `INSERT INTO projects (name) VALUES ($1) RETURNING *;`,
    };
    const values = [name];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addProjectUsers = (user_id, project_name, project_id) => {
    const query = {
      text: `INSERT INTO user_project (user_id, project_name, project_id) VALUES ($1, $2, $3) RETURNING *;`,
    };
    const values = [user_id, project_name, project_id];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addTicket = (name, description, priority, user_id, project_id) => {
    const query = {
      text: `INSERT INTO tickets (name, description, priority, user_id, project_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    };
    const values = [name, description, priority, user_id, project_id];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const addComment = (comment, user_id, ticket_id) => {
    const query = {
      text: `INSERT INTO comments (note, user_id, ticket_id) VALUES ($1, $2, $3) RETURNING *;`,
    };
    const values = [comment, user_id, ticket_id];
    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const editProject = (id, name, status, project_id) => {
    const query = {
      text: `INSERT INTO projects (id, name, status, date_updated)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO 
      UPDATE SET name = $2, status = $3, date_updated = $4 
      RETURNING *;`,
    };
    const values = [id, name, status, project_id];
    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const editUserProjects = (id, user_id, project_name, project_id) => {
    const query = {
      text: `INSERT INTO user_project (id, user_id, project_name, project_id)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO
      UPDATE SET user_id = $2, project_name = $3, project_id = $4
      RETURNING *;`,
    };
    const values = [id, user_id, project_name, project_id];
    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const login = (email, password) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1;`,
    };
    const values = [email];
    return db
      .query(query, values)
      .then((result) => {
        return result.rows[0];
      })
      .then((result) => {
        if (
          result !== undefined &&
          bcrypt.compareSync(password, result.password)
        ) {
          return result;
        }
        return null;
      })
      .catch((err) => err);
  };

  const editTicket = (
    id,
    name,
    description,
    priority,
    status,
    user_id,
    project_id,
    date_updated
  ) => {
    const query = {
      text: `INSERT INTO tickets (id, name, description, priority, status, user_id, project_id, date_updated)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO
      UPDATE SET name = $2, description = $3, priority = $4, status = $5, user_id = $6, project_id = $7, date_updated = $8
      RETURNING *;`,
    };
    const values = [
      id,
      name,
      description,
      priority,
      status,
      user_id,
      project_id,
      date_updated,
    ];
    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const deleteUser_Project = (project_id) => {
    const query = {
      text: `DELETE FROM user_project WHERE project_id = $1 RETURNING *;`,
    };
    const values = [project_id];
    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getUsers,
    getProjects,
    getProjectUsers,
    getProjectTickets,
    getProjectDetailsWithDevs,
    getTicketComments,
    getProjectDetails,
    getTicketDetails,
    addProject,
    addProjectUsers,
    addTicket,
    addComment,
    editProject,
    login,
    editTicket,
    editUserProjects,
    getUser_ProjectIds,
    deleteUser_Project,
  };
};
