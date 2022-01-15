DROP TABLE IF EXISTS tickets CASCADE;
DROP TYPE IF EXISTS priority CASCADE;
DROP TYPE IF EXISTS status CASCADE;

CREATE TYPE priority AS ENUM ('low','medium', 'high');
CREATE TYPE status AS ENUM ('open','pending', 'resolved');

CREATE TABLE tickets(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority priority,
    status status,
    date_created TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP(0) DEFAULT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE
);