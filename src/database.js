const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stephen-king-books'
});

mysqlConnection.connect(function (err) {
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DB is coonnected')
    }
});

module.exports = mysqlConnection;