module.exports = {
  createDatabase: {
    query: `CREATE DATABASE IF NOT EXISTS addictocode_api;`,
    log: "Action 'create database' at : "
  },
  createTable: {
    query: `
        DROP TABLE IF EXISTS \`editor_member\` ;
        DROP TABLE IF EXISTS \`book\` ;
        DROP TABLE IF EXISTS \`editor\` ;
        DROP TABLE IF EXISTS \`role\` ;
        DROP TABLE IF EXISTS \`user\` ;


        
        CREATE TABLE IF NOT EXISTS \`user\` (
          id            INT(11)         NOT NULL    AUTO_INCREMENT,
          username      VARCHAR(255)    NOT NULL,
          mail          VARCHAR(255)    NOT NULL,
          password      VARCHAR(255)    NOT NULL,
          role_id       INT             NOT NULL    DEFAULT 1,
          created_at    DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
          updated_at    DATETIME        NULL,
          PRIMARY KEY (id),
          CONSTRAINT unique_user_username UNIQUE (username(250)),
          CONSTRAINT unique_user_mail UNIQUE (mail(250))
        );

        CREATE UNIQUE INDEX idx_user_username ON user (username(250));
        CREATE UNIQUE INDEX idx_user_mail ON user (mail(250));
        

        
        CREATE TABLE IF NOT EXISTS \`role\`(
          id            INT(11)         NOT NULL    AUTO_INCREMENT,
          name          VARCHAR(255)    NOT NULL,
          created_at    DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
          updated_at    DATETIME        NULL,
          PRIMARY KEY (id),
          CONSTRAINT unique_role_name UNIQUE (name(250))
        );
        
        CREATE TABLE IF NOT EXISTS \`editor\` (
          id            INT(11)         NOT NULL    AUTO_INCREMENT,
          isbn_product  VARCHAR(255)    NOT NULL,
          isbn_country  VARCHAR(255)    NOT NULL,
          isbn_editor   VARCHAR(255)    NOT NULL,
          name          VARCHAR(255)    NOT NULL,
          created_at    DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
          updated_at    DATETIME        NULL,
          PRIMARY KEY (id),
          CONSTRAINT U_name UNIQUE (name(250)),
          CONSTRAINT U_isbn_product UNIQUE (isbn_product(250)),
          CONSTRAINT U_isbn_editor UNIQUE (isbn_editor(250))
        );
        CREATE UNIQUE INDEX idx_isbn_editor_editor ON editor (isbn_editor(250));
        
        CREATE TABLE IF NOT EXISTS \`editor_member\` (
          id            INT(11)     NOT NULL    AUTO_INCREMENT,
          created_at    DATETIME    NOT NULL    DEFAULT CURRENT_TIMESTAMP,
          updated_at    DATETIME    NULL,
          editor_id     INT(11)     NOT NULL,
          user_id       INT(11)     NOT NULL,
          PRIMARY KEY (id),
          CONSTRAINT FK_editor_member_id FOREIGN KEY (editor_id) 
            REFERENCES editor(id) ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT FK_user_member_id FOREIGN KEY (user_id) 
            REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
        );
         CREATE UNIQUE INDEX idx_editor_user_ids ON \`editor_member\` (editor_id ASC, user_id);
        CREATE INDEX idx_editor_member_user_id ON \`editor_member\` (user_id);
        
        CREATE TABLE IF NOT EXISTS \`book\` (
          id            INT(11)         NOT NULL    AUTO_INCREMENT,
          uuid          CHAR(36)        NOT NULL,
          isbn_article  VARCHAR(255)    NOT NULL,
          title         VARCHAR(255)    NOT NULL,
          authors       VARCHAR(255)    NOT NULL,
          metadata      JSON            NOT NULL,
          nav           JSON            NOT NULL,
          created_at    DATETIME        NOT NULL    DEFAULT CURRENT_TIMESTAMP,
          updated_at    DATETIME        NULL,
          editor_id     INT(11)         NOT NULL,
          PRIMARY KEY (id),
          CONSTRAINT FK_editor_id FOREIGN KEY (editor_id) 
            REFERENCES editor(id) ON DELETE NO ACTION ON UPDATE CASCADE
        );
        CREATE UNIQUE INDEX idx_book_uuid ON \`book\` (uuid);
        CREATE UNIQUE INDEX idx_book_isbn_article ON \`book\` (isbn_article(250));
        CREATE INDEX idx_book_editor_id ON \`book\` (editor_id);`,
    log: "Action 'create table' at : "
  },
  showTable: {
    query: `
        SHOW TABLES`,
    log: "Action 'show tables' at : "
  },
  deleteTable: {
    query: `
        DROP TABLE IF EXISTS \`editor_member\` ;
        DROP TABLE IF EXISTS \`book\` ;
        DROP TABLE IF EXISTS \`editor\` ;
        DROP TABLE IF EXISTS \`role\` ;
        DROP TABLE IF EXISTS \`user\` ;`,
    log: "Action 'delete table' at : "
  },
  insertFixtures: {
    query: `INSERT INTO \`role\`(\`name\`) VALUES ('Admin');
        INSERT INTO \`role\`(\`name\`) VALUES ('User');
        -- User
        INSERT INTO \`user\`(\`id\`,\`username\`, \`mail\`, \`password\`,\`role_id\`) VALUES (1,'admin','admin@moovleen.com','$2b$10$N7//hHzhQXWe45KNTa5rCuqdwCIIEdnm1qZ3Vfeec1jCeOasGVN/C',2);
        INSERT INTO \`user\`(\`id\`,\`username\`, \`mail\`, \`password\`,\`role_id\`) VALUES (2,'Pierre','pierre@moovleen.com','$2b$10$N7//hHzhQXWe45KNTa5rCuqdwCIIEdnm1qZ3Vfeec1jCeOasGVN/C',1);
        INSERT INTO \`user\`(\`id\`,\`username\`, \`mail\`, \`password\`,\`role_id\`) VALUES (3,'Paul','paul@moovleen.com','$2b$10$N7//hHzhQXWe45KNTa5rCuqdwCIIEdnm1qZ3Vfeec1jCeOasGVN/C',1);
        INSERT INTO \`user\`(\`id\`,\`username\`, \`mail\`, \`password\`,\`role_id\`) VALUES (4,'Jacques','jacques@moovleen.com','$2b$10$N7//hHzhQXWe45KNTa5rCuqdwCIIEdnm1qZ3Vfeec1jCeOasGVN/C',1);
        -- Editor
        INSERT INTO \`editor\`(\`isbn_product\`, \`isbn_country\`, \`isbn_editor\`, \`name\`) VALUES ('999','22','1234','Le Lys Bleu Éditions');
        INSERT INTO \`editor\`(\`isbn_product\`, \`isbn_country\`, \`isbn_editor\`, \`name\`) VALUES ('998','23','1235','Les Éditeurs Réunis');
        INSERT INTO \`editor\`(\`isbn_product\`, \`isbn_country\`, \`isbn_editor\`, \`name\`) VALUES ('997','22','1236','Hello Editions');
        INSERT INTO \`editor\`(\`isbn_product\`, \`isbn_country\`, \`isbn_editor\`, \`name\`) VALUES ('996','22','1237','Editions La Bruyère');
        INSERT INTO \`editor\`(\`isbn_product\`, \`isbn_country\`, \`isbn_editor\`, \`name\`) VALUES ('995','24','1238','Éditions Vie et Santé');
        INSERT INTO \`editor\`(\`isbn_product\`, \`isbn_country\`, \`isbn_editor\`, \`name\`) VALUES ('994','24','1239','Lys Editions Amatteis');
        INSERT INTO \`editor\`(\`isbn_product\`, \`isbn_country\`, \`isbn_editor\`, \`name\`) VALUES ('993','23','1240','Éditions le Héron Argent');
        INSERT INTO \`editor\`(\`isbn_product\`, \`isbn_country\`, \`isbn_editor\`, \`name\`) VALUES ('992','23','1241','Éditions ENI');
        -- Editor_member
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('1','1');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('2','1');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('3','1');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('4','1');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('5','1');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('6','1');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('7','1');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('8','1');
        
        
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('1','2');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('2','2');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('3','2');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('4','3');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('5','3');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('6','4');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('7','4');
        INSERT INTO \`editor_member\`( \`editor_id\`, \`user_id\`) VALUES ('8','4');
        -- Books
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4564','789120','La cité des nuages et des oiseaux','Anthony Doerr','{"pages":321}','{"chapitres":12}','1','2022-09-01');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4565','789121','La cité des nuages','Larry McMurtry ','{"pages":123}','{"chapitres":15}','1','2022-09-02');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4566','789122','La cité des oiseaux','Marcel Proust','{"pages":45}','{"chapitres":10}','2','2022-09-03');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4567','789123','Lonesome Dove','Larry McMurtry ','{"pages":321}','{"chapitres":14}','2','2022-09-04');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4568','789124','Lumière ','Christelle Saïani ','{"pages":87}','{"chapitres":13}','3','2022-09-05');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4569','789125','Le comte de Monte-Cristo ','Alexandre Dumas ','{"pages":158}','{"chapitres":15}','3','2022-09-06');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4561','789126','La passe-miroir, tome 2 : Les disparus du Clairdelune ','Christelle Dabos ','{"pages":120}','{"chapitres":20}','4','2022-09-07');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4562','789127','The Elements, tome 3 : The Silent Waters ','Brittainy C. Cherry ','{"pages":310}','{"chapitres":18}','4','2022-09-08');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4563','789128','Racines ','Alex Haley ','{"pages":200}','{"chapitres":201}','5','2022-09-09');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4570','789129','Harry Potter, tome 7 : Harry Potter et les reliques de la mort','J. K. Rowling ','{"pages":450}','{"chapitres":6}','5','2022-09-10');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4571','789130','Da Vinci Code','Dan Brown','{"pages":65}','{"chapitres":10}','6','2022-09-11');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4572','789131','Nous rêvions juste de liberté ','Henri Loevenbruck ','{"pages":178}','{"chapitres":15}','6','2022-09-12');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4573','789132','Anne de Green Gables ','Lucy Maud Montgomery ','{"pages":98}','{"chapitres":12}','7','2022-09-13');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4574','789133','Les Rois maudits - Omnibus - Intégrale','Maurice Druon ','{"pages":125}','{"chapitres":8}','7','2022-09-14');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4575','789134','Gagner la guerre','Jean-Philippe Jaworski ','{"pages":45}','{"chapitres":12}','8','2022-09-15');
        
        INSERT INTO \`book\`(\`uuid\`, \`isbn_article\`, \`title\`, \`authors\`, \`metadata\`, \`nav\`,\`editor_id\`,\`created_at\`) VALUES ('4576','789135','Martin Eden ','Jack London ','{"pages":145}','{"chapitres":18}','8','2022-09-16');`,
    log: "Action 'insert' at : "

  },
}