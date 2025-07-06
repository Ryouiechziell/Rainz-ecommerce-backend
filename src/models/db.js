const mysql = require('mysql2/promise');
require("dotenv").config()

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "MangaStore",
  password: "",
});

module.exports = db;
