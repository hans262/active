import { createConnection } from "mysql2";

const connect = createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "my_db",
});

connect.query(
  `
  create table IF NOT EXISTS test(
    id int AUTO_INCREMENT PRIMARY KEY,
    name varchar(10)
  ) CHARSET = utf8;
`,
  (err, ret: any[]) => {
    console.log(ret);
  }
);
