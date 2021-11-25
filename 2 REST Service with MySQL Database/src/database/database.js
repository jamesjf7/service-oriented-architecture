const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tutor_soa",
});

const query = (sql, args) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, args, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
};

module.exports = {
    query,
};
