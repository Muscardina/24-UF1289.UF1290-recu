// config.js
const mysql = require("mysql");
require("dotenv").config();

//const connection = mysql.createConnection({
  //host: process.env.DB_HOST,
  //user: process.env.DB_USER,
 // password: process.env.DB_PASSWORD,
 // database: process.env.DB_NAME,
//});

//connection.connect((err) => {
  //if (err) {
    //console.error("Error connecting to MySQL:", err);
    //return;
 // }
  //console.log("Connected to MySQL!");
//});


class Database {
  constructor() {
      this.connection = mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
      });

      this.connection.connect((err) => {
          if (err) {
              console.error("Error connecting to MySQL:", err);
              return;
          }
          console.log("Connected to MySQL!");
      });
  }

  getStudentById(Id, callback) {
      const query = "SELECT * FROM school.persons WHERE id = ?";
      this.connection.query(query, [Id], (err, results) => {
          if (err) {
              console.error("Error fetching student:", err);
              return callback(err, null);
          }
          if (results.length > 0) {
              callback(null, results[0]);
          } else {
              callback(null, null); 
          }
      });
  }
}


module.exports = new Database();