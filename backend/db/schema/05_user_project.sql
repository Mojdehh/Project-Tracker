DROP TABLE IF EXISTS user_project CASCADE;
CREATE TABLE user_project(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    project_name VARCHAR(255) REFERENCES projects(name) ON DELETE CASCADE ON UPDATE CASCADE,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE
);