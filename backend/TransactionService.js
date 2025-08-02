const dbcreds = require('./DbConfig');
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: process.env.DB_HOST || dbcreds.DB_HOST,
    user: process.env.DB_USER || dbcreds.DB_USER,
    password: process.env.DB_PWD || dbcreds.DB_PWD,
    database: process.env.DB_DATABASE || dbcreds.DB_DATABASE
});

function addTransaction(amount, desc, callback) {
    const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount)) {
        return callback({ status: 400, message: "Amount must be a valid number" });
    }

    const sql = "INSERT INTO `transactions` (`amount`, `description`) VALUES (?, ?)";
    con.query(sql, [parsedAmount, desc], function (err, result) {
        if (err) return callback({ status: 500, message: err.message });
        return callback(null, { status: 200, result });
    });
}

function getAllTransactions(callback) {
    const sql = "SELECT * FROM transactions";
    con.query(sql, function (err, result) {
        if (err) return callback(err);
        return callback(null, result);
    });
}

function findTransactionById(id, callback) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        return callback({ status: 400, message: "Invalid transaction ID" });
    }

    const sql = "SELECT * FROM transactions WHERE id = ?";
    con.query(sql, [parsedId], function (err, result) {
        if (err) return callback(err);
        return callback(null, result);
    });
}

function deleteAllTransactions(callback) {
    const sql = "DELETE FROM transactions";
    con.query(sql, function (err, result) {
        if (err) return callback(err);
        return callback(null, result);
    });
}

function deleteTransactionById(id, callback) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        return callback({ status: 400, message: "Invalid transaction ID" });
    }

    const sql = "DELETE FROM transactions WHERE id = ?";
    con.query(sql, [parsedId], function (err, result) {
        if (err) return callback(err);
        return callback(null, result);
    });
}

module.exports = {
    addTransaction,
    getAllTransactions,
    findTransactionById,
    deleteAllTransactions,
    deleteTransactionById
};

// const dbcreds = require('./DbConfig');
// const mysql = require('mysql2'); // Change to mysql2

// const con = mysql.createConnection({
//     host: process.env.DB_HOST || dbcreds.DB_HOST,
//     user: process.env.DB_USER || dbcreds.DB_USER,
//     password: process.env.DB_PWD || dbcreds.DB_PWD,
//     database: process.env.DB_DATABASE || dbcreds.DB_DATABASE
// });

// function addTransaction(amount,desc){
//     var mysql = `INSERT INTO \`transactions\` (\`amount\`, \`description\`) VALUES ('${amount}','${desc}')`;
//     con.query(mysql, function(err,result){
//         if (err) throw err;
//         //console.log("Adding to the table should have worked");
//     }) 
//     return 200;
// }

// function getAllTransactions(callback){
//     var mysql = "SELECT * FROM transactions";
//     con.query(mysql, function(err,result){
//         if (err) throw err;
//         //console.log("Getting all transactions...");
//         return(callback(result));
//     });
// }

// function findTransactionById(id,callback){
//     var mysql = `SELECT * FROM transactions WHERE id = ${id}`;
//     con.query(mysql, function(err,result){
//         if (err) throw err;
//         console.log(`retrieving transactions with id ${id}`);
//         return(callback(result));
//     }) 
// }

// function deleteAllTransactions(callback){
//     var mysql = "DELETE FROM transactions";
//     con.query(mysql, function(err,result){
//         if (err) throw err;
//         //console.log("Deleting all transactions...");
//         return(callback(result));
//     }) 
// }

// function deleteTransactionById(id, callback){
//     var mysql = `DELETE FROM transactions WHERE id = ${id}`;
//     con.query(mysql, function(err,result){
//         if (err) throw err;
//         console.log(`Deleting transactions with id ${id}`);
//         return(callback(result));
//     }) 
// }

// module.exports = {
//     addTransaction,
//     getAllTransactions,
//     findTransactionById,
//     deleteAllTransactions,
//     deleteTransactionById
// };

