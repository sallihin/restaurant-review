"use strict"

// First we import 
const reviewsDB = require('../models/ReviewsDB');
const checkToken = require('../auth/tokenValidation');

// Then we initialize the object
var reviewsDBOject = new reviewsDB();

const routeReviews = app => { 

    app.route('/reviews')
        .get(reviewsDBOject.getAllReviews);

    app.route('/reviews/:id')
        .get(reviewsDBOject.getReviewsByUser)
        .post(checkToken(['admin','user']), reviewsDBOject.createReview)
        .put(checkToken(['admin','user']), reviewsDBOject.updateReview)
        .delete(checkToken(['admin','user']), reviewsDBOject.deleteReview);

    app.route('/reviews/restaurant/:id')
        .get(reviewsDBOject.getReviewsByRestaurant);

    app.route('/reviews/ratings/:id')
        .get(reviewsDBOject.getRatingsByRestaurant);

}

module.exports = {routeReviews}; 