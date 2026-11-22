-- database: :memory:
-- database: :memory:
CREATE TABLE users (
	id INTEGER,
	nom TEXT,
	email TEXT,
	age INTEGER
);

-- Pour importer le fichier CSV, exécutez ces commandes dans le shell sqlite3,
-- et non dans l'éditeur de requêtes SQL :
-- .mode csv
-- .import --skip 1 C:/wamp64/tmp/users.csv users