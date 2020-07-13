const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'gero',
    password:'samsrl9l9',
    database:'electrondb'
})

function  getConnection(){
    return connection;
}

module.exports = { getConnection}