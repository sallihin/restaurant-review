"use strict"

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken'); // 
const db = require('../db-connection');

class UsersDB 
{ 
    getAllUser(request, respond) { 
        var sql = 'SELECT * FROM eatout.users';
        
        db.query(sql, (error, result) => {
            if (error) {
                throw error;
            }
            else { 
                respond.json(result);
            }
        });
    }

    getUserById(request, respond) { 
        var sql = 'SELECT * FROM eatout.users WHERE user_id = ?';
        var userId = request.params.id;

        db.query(sql, userId, (error, result) => {
            if (error) {
                throw error;
            }
            else { 
                respond.json(result);
            }
        });
    }

    createUser(request, respond) { 
        // Password Encryption
        const salt = genSaltSync(10);
        var hashedPassword = hashSync(request.body.user_password, salt);
        
        var sql = 'INSERT INTO eatout.users (user_login, user_password, user_email, user_firstname, user_lastname, user_gender, user_mobile, user_address) VALUES (?,?,?,?,?,?,?,?)';
        var values = [request.body.user_login, hashedPassword, request.body.user_email, request.body.user_firstname, request.body.user_lastname, request.body.user_gender, request.body.user_mobile, request.body.user_address];

        db.query(sql, values, (error, result) => {
            if (error) {
                throw error;
            }
            else { 
                respond.json(result);
            }
        });
    }

    updateUser(request, respond) { 
        var sql = 'UPDATE eatout.users SET ? WHERE user_id = ?';
        var userId = request.params.id;

        if (request.body.user_password) { 
            // Password Encryption
            const salt = genSaltSync(10);
            request.body.user_password = hashSync(request.body.user_password, salt);
        }

        var values = [request.body, userId];
        
        db.query(sql, values, (error, result) => {
            if (error) {
                throw error;
            }
            else { 
                respond.json(result);
            }
        });
    }

    deleteUser(request, respond) { 
        var sql = 'DELETE FROM eatout.users WHERE user_id = ?';
        var userId = request.params.id;

        db.query(sql, userId, (error, result) => {
            if (error) {
                throw error;
            }
            else { 
                respond.json(result);
            }
        });
    }

    auth(request, respond) { 
        var sql = 'SELECT user_id, user_login, user_password, user_role FROM eatout.users WHERE user_login = ?'
        
        // Query pulls all user data from MySQL 
        db.query(sql, [request.body.username], (error, result) => {
            if (error) {
                throw error;
            } 

            // If result is empty, the username is wrong
            else if (result == "") {
                respond.json({
                    success: 0, 
                    message: "Invalid username"
                })

            } else { 
                // Compares request.body.password to query result
                const isSamePassword = compareSync(request.body.password, result[0].user_password);

                if (isSamePassword) {
                    console.log(result[0])
                    result[0].user_password = undefined
                    const jsontoken = sign({ result: result[0] }, process.env.JSONTOKEN_KEY, { expiresIn: process.env.JSONTOKEN_EXPIRE }); 
                    
                    return respond.json({
                        success: 1,
                        message: "Login successful",
                        token: jsontoken
                    });

                } else { 
                    return respond.json({
                        success: 0,
                        data: "Invalid password"
                    })
                }
            }
        })
    }
}

module.exports = UsersDB

