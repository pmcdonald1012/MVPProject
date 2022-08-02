DROP TABLE IF EXISTS saves;
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS users;


-- login page database!!!
CREATE TABLE users (
    userid serial PRIMARY KEY,
    username text, 
    password text
);
CREATE TABLE quotes (
    quoteid serial PRIMARY KEY,
    contents json
);
CREATE TABLE saves (
   saveid serial, 
   quoteid int,
   userid int,
   FOREIGN KEY (saveid) REFERENCES quotes(quoteid) ON DELETE CASCADE,
   FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);

INSERT INTO users (username, password) VALUES ('1','1');

-- INSERT INTO tasks (taskcontents) VALUES 
--    ('Take Trash Out'),
--    ('Take Dogs For a walk'),
--    ('Do laundry'),
--    ('Create your mvp project');

-- INSERT INTO workspaces(taskid, userid) VALUES (1, 1);

--save quotes!!