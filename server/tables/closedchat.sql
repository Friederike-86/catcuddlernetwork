DROP TABLE IF EXISTS closedchat;

CREATE TABLE closedchat (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    socket VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);