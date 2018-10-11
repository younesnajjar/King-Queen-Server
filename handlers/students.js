"use strict";
let mysql  = require('mysql');
let config = require('../config/config.js');
let connection = mysql.createConnection(config);
const studentsDBHandler = require("../dbhandlers/students");

module.exports = {
    bringAllStrudents : function(callback){
        let sql = `SELECT * FROM students`;
        connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        callback(results);
        console.log(results);
        });
    },
    bringAllUnratedStudents : function(rater_id,callback){
        let sql = `SELECT * FROM students WHERE id NOT IN (SELECT rated_id FROM ratings WHERE rater_id =`+rater_id+` )`;
        connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        callback(results);
        console.log(results);
        });
    },getFullNameById(id,callback){
        let sql = `SELECT full_name FROM students WHERE id = `+ id;
        connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        callback(results[0]["full_name"]);
        });
    },verifyExistenceByName(requestDB,callback){
        console.log(requestDB.user_name);
        let sql = "SELECT id,count(id) as c FROM students WHERE full_name = '"+requestDB.user_name+"'";
        connection.query(sql, (error, results, fields) => {
        var exists;
        if( results[0]["c"] != 0)
            exists = true;
        else
            exists = false;
        if (error) {
            return console.error(error.message);
        }
        callback({user_id : results[0]["id"],
                    existence_count : exists});
        });
    }
};