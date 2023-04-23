const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ticket_management',
    port: '3306'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database = ', err);
        return;
    }
    console.log('MySQL Connected!');
});

module.exports = connection;
