const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "datatransfer",
});

db.connect((err) => {
  if (err) {
    console.log("error: " + err.message);
    return;
  }
  console.log("Connected to the MySQL server.");
});

module.exports = {
  db,
};
