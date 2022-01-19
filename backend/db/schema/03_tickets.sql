DROP TABLE IF EXISTS tickets CASCADE;
DROP TYPE IF EXISTS priority CASCADE;
DROP TYPE IF EXISTS status CASCADE;

CREATE TYPE priority AS ENUM ('Low','Medium', 'High');
CREATE TYPE status AS ENUM ('Open','Pending', 'Resolved');

CREATE TABLE tickets(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority priority,
    status status DEFAULT 'Open',
    date_created TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,
    date_updated TIMESTAMP(0) DEFAULT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE
);