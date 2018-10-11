"use strict";
let mysql  = require('mysql');
let config = require('../config/config.js');
let connection = mysql.createConnection(config);
const studentsDBHandler = require("../dbhandlers/students");

module.exports = {
    addRating: function(ratingBody,callback){
        console.log("rater_id = "+ratingBody.rater_id+" | rated_id = "+ratingBody.rated_id);
        this.verifyExistenceOfRating(ratingBody,existenceResult => {
            if(existenceResult == false){
                callback({error:"All ready rated"});
            }
            else{
                //callback("rating operation is ready to be done");
                var sql = "INSERT INTO ratings (rater_id, rated_id,rate) VALUES ("+ratingBody.rater_id+","+ratingBody.rated_id+","+ratingBody.rate+")";
                connection.query(sql, function (err, result) {
                    if (err) throw err;
                    callback({inserion_id : result.insertId});
                  });
            }
        });
    },
    verifyExistenceOfRating: function(ratingBody,callback){
        let sql = `SELECT * FROM ratings WHERE rater_id =`+ratingBody.rater_id+` AND rated_id = `+ratingBody.rated_id;
        connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        if(results[0] == undefined){
            callback(true);
        }
        else{
           
            callback(false);
        }
    });
    }
}