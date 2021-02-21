"use strict"

// First we import 
const restaurantsDB = require('../models/RestaurantsDB');
const checkToken = require('../auth/tokenValidation');

// Then we initialize the object
var restaurantsDBObject = new restaurantsDB();

const routeRestaurants = app => { 

    app.route('/restaurants')
        .get(restaurantsDBObject.getAllRestaurants);

    app.route('/restaurants/:id')
        .get(restaurantsDBObject.getRestaurantById); 
        
    app.route('/restaurants/category/:category')
        .get(restaurantsDBObject.getRestaurantsByCategory);

    app.route('/restaurants/search/:query')  
        .get(restaurantsDBObject.searchRestaurantByName);
}

module.exports = {routeRestaurants}; 