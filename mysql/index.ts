import { createConnection } from 'mysql2';

const connection = createConnection({
	host: "127.0.0.1",
	port: 3306,
	user: "root",
	password: "12345678",
	database: "my_db",
})

connection.query(`SELECT * FROM user`,
	(_, results) => {
		console.log(results)
		// connection.destroy()
	}
)
