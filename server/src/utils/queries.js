export const createMessageTable = `
DROP TABLE IF EXISTS messages;
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR DEFAULT '',
    message VARCHAR NOT NULL
)
`;

export const insertMessages = `
INSERT INTO messages(name, message)
VALUES ('test', 'first message'),
    ('test2', 'second message');
`;

export const createUserTable = `
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE,
    password VARCHAR(100),
    type VARCHAR(50)
)
`;

export const createPostTable = `
DROP TABLE IF EXISTS posts;
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    document jsonb,
    comments jsonb,
    likes INTEGER
)
`

export const dropMessagesTable = `DROP TABLE messages;`;
export const dropPostsTable = `DROP TABLE posts;`;