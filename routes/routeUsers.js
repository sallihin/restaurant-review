"use strict"

// First we import 
const usersDB = require('../models/UsersDB');

// Then we initialize the object
var usersDBOject = new usersDB();

const routeUsers = app => { 
    app.route('/users/register')
        .post(usersDBOject.createUser);
    app.route('/users/')
        .get(usersDBOject.getAllUser);
    app.route('/users/:id')
        .get(usersDBOject.getUserById)
        .delete(usersDBOject.deleteUser)
        .put(usersDBOject.updateUser);
    app.route('/auth') 
        .post(usersDBOject.auth);

}

module.exports = {routeUsers};