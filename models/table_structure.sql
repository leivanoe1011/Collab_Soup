
DROP DATABASE IF EXISTS collab_soup_DB;
CREATE DATABASE collab_soup_DB;

USE collab_soup_DB;

-- Used to store the User and Password Information
CREATE TABLE users
(
	id INT AUTO_INCREMENT NOT NULL,
		PRIMARY KEY(id),
	email VARCHAR(500) NOT NULL,
    password VARCHAR(2000) NOT NULL
);

-- Link user to the Languages they are confortable with
CREATE TABLE user_languages
(
	id INT AUTO_INCREMENT NOT NULL,
		PRIMARY KEY(id),
	userid INT,
		FOREIGN KEY(user_id)
			REFERENCES users(id),
	language_name VARCHAR(500) NOT NULL
);

-- Manages the projects in our app
CREATE TABLE projects
(
	id INT AUTO_INCREMENT NOT NULL,
		PRIMARY KEY(id),
	project_name VARCHAR(500) NOT NULL,
    project_description VARCHAR(2000) NULL
);

-- Lists all the languages used for a specific project
CREATE TABLE project_languages
(
	id INT AUTO_INCREMENT NOT NULL,
		PRIMARY KEY(id),
	project_id INT, 
		FOREIGN KEY(project_id)
			REFERENCES projects(id),
	language_name VARCHAR(255) NOT NULL
);

-- Link users to projects
CREATE TABLE user_project
(
	id INT AUTO_INCREMENT NOT NULL,
		PRIMARY KEY(id),
	user_id INT,
		FOREIGN KEY(user_id)
			REFERENCES users(id),
    project_id INT,
		FOREIGN KEY(project_id)
			REFERENCES projects(id)
);



CREATE TABLE profile_comments (
	id INT AUTO_INCREMENT NOT NULL,
		PRIMARY KEY(id),
	userid INT,
		FOREIGN KEY(user_id)
				REFERENCES users(id),
	
	commenter_id INT,
		FOREIGN KEY(user_id)
				REFERENCES users(id),
	
	comment VARCHAR(2000)

);