module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT * FROM users",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getProjects = () => {
    const query = {
      text: "SELECT * FROM projects",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  // const getUserByEmail = email => {

  //     const query = {
  //         text: `SELECT * FROM users WHERE email = $1` ,
  //         values: [email]
  //     }

  //     return db
  //         .query(query)
  //         .then(result => result.rows[0])
  //         .catch((err) => err);
  // }

  // const addUser = (firstName, lastName, email, password) => {
  //     const query = {
  //         text: `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *` ,
  //         values: [firstName, lastName, email, password]
  //     }

  //     return db.query(query)
  //         .then(result => result.rows[0])
  //         .catch(err => err);
  // }

  const getProjectDetails = () => {
    const query = {
      text: `SELECT projects.*, count(tickets.*) 
          as number_of_tickets FROM projects 
          JOIN tickets ON projects.id = project_id 
          GROUP BY projects.id`,
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getProjectDetailsWithNumDevs = (id) => {
    const query = {
      text: `SELECT projects.*, COUNT(user_project.user_id) as devs 
        FROM projects
        JOIN user_project ON projects.id = project_id
        WHERE projects.id = $1
        GROUP BY projects.id`,
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
          WHERE project_id = $1`,
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
      text: `SELECT * FROM tickets WHERE project_id = $1`,
    };
    const values = [id];

    return db
      .query(query, values)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getTicketComments = (id) => {
    const query = {
      text: ` SELECT * FROM comments WHERE ticket_id = $1`,
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

  return {
    getUsers,
    getProjects,
    getProjectUsers,
    getProjectTickets,
    getProjectDetailsWithNumDevs,
    getTicketComments,
    getProjectDetails,
    getTicketDetails,
  };
};
