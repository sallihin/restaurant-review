"use strict"

// First we import 
const usersDB = require('../models/UsersDB');
const checkToken = require('../auth/tokenValidation');

// Then we initialize the object
var usersDBOject = new usersDB();

const routeUsers = app => { 

    app.route('/users')
    .get(checkToken(['admin']), usersDBOject.getAllUser);

    app.route('/users/:id')
        .get(checkToken(['admin','user']), usersDBOject.getUserById)
        .delete(checkToken(['admin','user']), usersDBOject.deleteUser)
        .put(checkToken(['admin','user']), usersDBOject.updateUser); 
        
    app.route('/users/register')
        .post(usersDBOject.createUser);

    app.route('/login')  
        .post(usersDBOject.auth);
}

module.exports = {routeUsers}; 