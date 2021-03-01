"use strict"

const db = require('../db-connection');

class RestaurantsDB 
{ 
    getAllRestaurants(request, respond) { 
        var sql = 'SELECT restaurant_id, restaurant_name, restaurant_address, restaurant_telephone, restaurant_menu, restaurant_url, restaurant_photo_1, JSON_ARRAYAGG(category_name) AS categories FROM eatout.restaurant INNER JOIN eatout.restaurant_category ON eatout.restaurant.restaurant_id = eatout.restaurant_category.rc_restaurant_id INNER JOIN eatout.category ON eatout.restaurant_category.rc_category_id = eatout.category.category_id GROUP BY restaurant_id';
        db.query(sql, (error, result) => {
            if (error) {
                throw error;
            }
            else { 
                respond.json(result);
            }
        });
    }

    getRestaurantById(request, respond) { 
        var sql = 'SELECT * FROM eatout.restaurant WHERE restaurant_id = ?';
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

    getRestaurantsByCategory(request, respond) { 
        var sql = 'SELECT restaurant_id, restaurant_name, restaurant_address, restaurant_telephone, restaurant_menu, restaurant_url, restaurant_photo_1, category_name FROM eatout.restaurant INNER JOIN eatout.restaurant_category ON eatout.restaurant.restaurant_id = eatout.restaurant_category.rc_restaurant_id INNER JOIN eatout.category ON eatout.restaurant_category.rc_category_id = eatout.category.category_id WHERE eatout.category.category_name LIKE ?';
        var values = request.params.category;
        
        db.query(sql, values, (error, result) => {
            if (error) {
                throw error;
            }
            else { 
                respond.json(result);
            }
        });
    }

    searchRestaurantByName(request, respond) { 
        var sql = 'SELECT restaurant_id, restaurant_name, restaurant_address, restaurant_telephone, restaurant_menu, restaurant_url, restaurant_photo_1, JSON_ARRAYAGG(category_name) AS categories FROM eatout.restaurant INNER JOIN eatout.restaurant_category ON eatout.restaurant.restaurant_id = eatout.restaurant_category.rc_restaurant_id INNER JOIN eatout.category ON eatout.restaurant_category.rc_category_id = eatout.category.category_id WHERE CONCAT (restaurant_name, restaurant_address, category_name) LIKE CONCAT("%",?,"%") GROUP BY restaurant_id;';
        var values = request.params.query;
        
        db.query(sql, values, (error, result) => {
            if (error) {
                throw error;
            }
            else { 
                respond.json(result);
            }
        });
    }  
    

}

module.exports = RestaurantsDB

