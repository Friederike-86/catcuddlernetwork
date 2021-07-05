DROP TABLE IF EXISTS ratings;

CREATE TABLE ratings (
id SERIAL PRIMARY KEY,
sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
rating INTEGER CHECK (rating >= 0 AND rating <=5))