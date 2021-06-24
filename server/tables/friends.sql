DROP TABLE IF EXISTS friends;

CREATE TABLE friends(
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    friendstatus BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 