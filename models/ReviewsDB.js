"use strict"

const db = require('../db-connection');

class ReviewsDB 
{ 
    getAllReviews(request, respond) { 
        var sql = 'SELECT * FROM eatout.reviews';
        
        db.query(sql, (error, result) => {
            if (error) {
                throw error;
            }
            else { 
                respond.json(result);
            }
        });
    }

    getReviewsByUser(request, respond) { 
        var sql = 'SELECT users.user_id, user_firstname, user_lastname, user_photo, review_rating, review_title, review_writeup, review_photo_1, review_photo_2, review_visited, review_added, review_status FROM eatout.reviews INNER JOIN eatout.users ON users.user_id = reviews.user_id WHERE users.user_id = ?';
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

    getRatingsByRestaurant(request, respond) { 
        var sql = 'SELECT review_rating FROM eatout.reviews WHERE restaurant_id = ?';
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

    getReviewsByRestaurant(request, respond) { 
        var sql = 'SELECT users.user_id, user_firstname, user_lastname, user_address, user_photo, review_rating, review_title, review_writeup, review_photo_1, review_photo_2, review_visited, review_added, review_status FROM eatout.reviews INNER JOIN eatout.users ON users.user_id = reviews.user_id INNER JOIN eatout.restaurant ON restaurant.restaurant_id = reviews.restaurant_id WHERE restaurant.restaurant_id = ?';
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
    


    createReview(request, respond) { 
        
        var sql = 'INSERT INTO eatout.reviews (restaurant_id, user_id, review_rating, review_title, review_writeup, review_photo_1, review_photo_2, review_visited) VALUES (?,?,?,?,?,?,?,?)';
        var values = [request.body.restaurant_id, request.params.id, request.body.review_rating, request.body.review_title, request.body.review_writeup, request.body.review_photo_1, request.body.review_photo_2, request.body.review_visited];

        db.query(sql, values, (error, result) => {
            if (error) {
                throw error;
            }
            else { 
                respond.json(result);
            }
        });
    }
    
    // User can only update their own reviews
    updateReview(request, respond) { 
        var sql = 'UPDATE eatout.reviews SET ? WHERE user_id = ? AND restaurant_id = ?';
        var values = [request.body, request.params.id, request.body.restaurant_id];

        // Check if the restaurant_id is provided
        if (!request.body.restaurant_id) { 
            return respond.json({
                success: 0,
                message: "Invalid request. Please include restaurant_id"
            })
        }
        
        db.query(sql, values, (error, result) => {
            if (error) {
                throw error;
            }
            else { 
                respond.json(result);
            }
        });
    }
    
    // User can only delete their own reviews
    deleteReview(request, respond) { 
        var sql = 'DELETE FROM eatout.reviews WHERE review_id = ?';
        var values = [request.body.review_id];

        // Check if the restaurant_id is provided
        if (!request.body.review_id) { 
            return respond.json({
                success: 0,
                message: "Invalid request. Please include review_id"
            })
        }        

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

module.exports = ReviewsDB

