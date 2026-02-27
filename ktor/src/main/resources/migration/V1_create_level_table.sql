DROP TABLE IF EXISTS level;
CREATE TABLE level(id SERIAL PRIMARY KEY, name VARCHAR(50), number VARCHAR(50), typingText VARCHAR(50));

INSERT INTO level (name, number, typingText) VALUES ('cleaning', 'Clean the house', 'Low');
INSERT INTO level (name, number, typingText) VALUES ('gardening', 'Mow the lawn', 'Medium');
INSERT INTO level (name, number, typingText) VALUES ('shopping', 'Buy the groceries', 'High');
INSERT INTO level (name, number, typingText) VALUES ('painting', 'Paint the fence', 'Medium');
INSERT INTO level (name, number, typingText) VALUES ('exercising', 'Walk the dog', 'Medium');
INSERT INTO level (name, number, typingText) VALUES ('meditating', 'Contemplate the infinite', 'High');