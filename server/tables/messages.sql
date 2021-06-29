DROP TABLE IF EXISTS messages;

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    sender INT NOT NULL,
    receiver INT NOT NULL,
    msg TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);