DROP TABLE IF EXISTS level;
CREATE TABLE level(id SERIAL PRIMARY KEY, name VARCHAR(50), number VARCHAR(50), typingText VARCHAR(50));

INSERT INTO level (name, number, typingText) VALUES ('Level 1', '1', 'The dog jumped over the fence');
INSERT INTO level (name, number, typingText) VALUES ('Level 2', '2', 'The fox walked over the dog');
INSERT INTO level (name, number, typingText) VALUES ('Level 3', '3', 'Text Text Text Text');
INSERT INTO level (name, number, typingText) VALUES ('Level 4', '4', 'Some more text');
INSERT INTO level (name, number, typingText) VALUES ('Level 5', '5', 'something more challenging');
INSERT INTO level (name, number, typingText) VALUES ('Level 6', '6', 'end of the text');