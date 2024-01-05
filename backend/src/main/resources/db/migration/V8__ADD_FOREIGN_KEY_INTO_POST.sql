ALTER TABLE post
    ADD FOREIGN KEY (created_by) REFERENCES users (username);
