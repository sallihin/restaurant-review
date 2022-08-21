// Checks the URL for restaurant id
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurant_id = urlParams.get('id');
const loggedin_user_id = sessionStorage.getItem("user_id");
const authorization = sessionStorage.getItem("token");
let submitted = false;

$(window).on("load", () => {

    // Redirect to homepage if ID tag is missing / broken page
    if (!restaurant_id) {
        window.location.replace('index.html');
    }

    // Displays submit button if logged in
    if (token) {
        document.getElementById('submit-review').style.display = 'inline-block';
    } else {
        document.getElementById('submit-review').style.display = 'none';
    }

    let request = new XMLHttpRequest();
        request.open('GET', apiPath + '/restaurants/' + restaurant_id, true);
        request.onload = () => {
            restaurant_arrays = JSON.parse(request.responseText);
            displayRestaurant();
        }
        request.send();
    getAllReviews(restaurant_id);

});

const displayRestaurant = () => {
    let columnContainer = document.getElementById('review-content');

    let restaurantId = restaurant_arrays[0].restaurant_id;
    let restaurantName = restaurant_arrays[0].restaurant_name;
    let restaurantPhoto1 = restaurant_arrays[0].restaurant_photo_1;
    let restaurantAddress = restaurant_arrays[0].restaurant_address;

    let getReviews = getReviewRating(restaurantId);
    let restaurantRating = getReviews[1];
    let total_users = getReviews[0];

    document.getElementById('restaurantName').innerHTML = restaurantName;
    document.getElementById('restaurantNameBreadcrumb').innerHTML = restaurantName;
    document.getElementById('total-reviews').innerHTML = `${total_users || 0} Reviews`;
    document.getElementById('submit-review').setAttribute('href', `submit.html?id=${restaurant_id}`);

    let restaurantPhoto2 = "";
    let restaurantCategory = "";
    let restaurantTelephone = "";
    let restaurantMenu = "";
    let restaurantUrl = "";
    let restaurantIG = "";

    // Dynamically fills in the images based on ratings
    let activestars = '<img src="/images/star_active.png" srcset="/images/star_active@2x.png 2x">'.repeat(restaurantRating);
    let inactive = '<img src="/images/star.png" srcset="/images/star@2x.png 2x">'.repeat(5 - restaurantRating);

    document.getElementById('insert-stars-here').innerHTML = `${activestars}${inactive}`;
    // We omit 'categories' from result if searching by category
    if (restaurant_arrays[0].categories) {
        let arrayCategory = JSON.parse(restaurant_arrays[0].categories); // JSON.parse converts to JS object
        let prettyCategory = arrayCategory.join(", "); // Display as comma separated string
        restaurantCategory = prettyCategory ? prettyCategory : ""; // Ternary operator, display value if available
    }

    document.getElementById('categories').innerHTML = restaurantCategory;

    if (restaurant_arrays[0].restaurant_photo_2) {
        restaurantPhoto2 = `<div class="carousel-item"><img src="${restaurant_arrays[0].restaurant_photo_2}" class="d-block w-100" alt=""></div>`;
    }

    if (restaurant_arrays[0].restaurant_telephone) {
        restaurantTelephone = `<span class="telephone"><img src="images/telephone.png" alt=""> ${restaurant_arrays[0].restaurant_telephone}</span>`;
    }

    if (restaurant_arrays[0].restaurant_menu) {
        restaurantMenu = `<a class="ext-link" href="${restaurant_arrays[0].restaurant_menu}" target="_blank">Menu</a>`;
    }

    if (restaurant_arrays[0].restaurant_url) {
        restaurantUrl = `<a class="ext-link" href="${restaurant_arrays[0].restaurant_url}" target="_blank">Website</a>`;
    }

    if (restaurant_arrays[0].restaurant_ig) {
        restaurantIG = `<a class="ext-link" href="${restaurant_arrays[0].restaurant_url}" target="_blank">Instagram</a>`;
    }

    // Uses ES6 Template Literals
    let reviewcontent =
        `<div class="row row-cols-1 row-cols-lg-2 " id="restaurant-details">
                <div class="col">
                    <div id="review-restaurant-photos" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${restaurantPhoto1}" class="d-block w-100" alt="">
                            </div>
                            ${restaurantPhoto2}
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#review-restaurant-photos"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#review-restaurant-photos"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div class="col">
                    <div id="content" class="card row g-0 border overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div class="col p-4 d-flex flex-column position-static">
                            <div class="row d-flex align-items-center">
                                <h4>Restaurant Details</h4>
                                <span class="address">${restaurantAddress}</span>
                                ${restaurantTelephone}
                                ${restaurantMenu}
                                ${restaurantUrl}
                                ${restaurantIG}
                            </div>
                            <div class="row align-items-end">
                                <div class="col align-self-end claim-business">
                                    Is this your listing? <a href="mailto:sallihin@gmail.com">Claim This Business</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
    columnContainer.insertAdjacentHTML('beforeend', reviewcontent);


}

// This method calls the API separately and retrieves the ratings 
const getReviewRating = (id) => {
    let rating_arrays = "";

    let request = new XMLHttpRequest();
        request.open('GET', `/reviews/restaurant/${restaurant_id}`, false);
        request.onload = () => {
            rating_arrays = JSON.parse(request.responseText);
        }
        request.send();

    let totalRating = 0;
    let totalUsers = rating_arrays.length;

    // Sum of all individual rating
    for (let i = 0; i < rating_arrays.length; i++) {
        totalRating += rating_arrays[i].review_rating;
    }

    // Divide total ratings by number of user, defaults to 0
    let averageRating = Math.floor(totalRating / totalUsers) || 0;

    return [totalUsers, averageRating];
}

const getAllReviews = (id) => {
    let request = new XMLHttpRequest();
        request.open('GET', `/reviews/restaurant/${id}`, false);
        request.onload = () => {
            review_arrays = JSON.parse(request.responseText);
        }
        request.send();
        console.log(review_arrays)

    let individualReviews = document.getElementById('individual-reviews');

    // Displays the Review title if there is 1 or more reviews
    if (review_arrays[0] != undefined ) {
        let reviewTitle = `<div class="row row-cols-1"><div class="col"><h3>Reviews</h3></div></div>`;
        individualReviews.insertAdjacentHTML('beforeend', reviewTitle);
    }

    for (let i = 0; i < review_arrays.length; i++) {
        let review_id = review_arrays[i].review_id;
        let reviewUserId = review_arrays[i].user_id;
        let profileImage = review_arrays[i].user_photo;
        let firstName = review_arrays[i].user_firstname;
        let lastName = review_arrays[i].user_lastname;
        let address = review_arrays[i].user_address;
        let rating = review_arrays[i].review_rating;
        let title = review_arrays[i].review_title;
        let reviewWriting = review_arrays[i].review_writeup;
        let reviewSentiment = review_arrays[i].review_sentiment;

        // Dates formatting
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let visited = new Date(review_arrays[i].review_visited);
        let visitedFormatted = visited.getDate() + " " + monthNames[visited.getMonth()] + " " + visited.getFullYear();
        let VisitedSendParam = visited.getFullYear() + "-" + ("0" + (visited.getMonth() + 1)).slice(-2)+ "-" + ("0" + visited.getDate()).slice(-2);
        let reviewAdded = new Date(review_arrays[i].review_added);
        let reviewAddedFormatted = reviewAdded.getDate() + " " + monthNames[reviewAdded.getMonth()] + " " + reviewAdded.getFullYear();
        let isThisMyReview = "";
        let sentimentBox = "";

        if (reviewUserId == loggedin_user_id) {
            document.getElementById('submit-review').style.display = 'none';
            isThisMyReview = `<div id="modify-reviews"><a id="edit-review" class="edit-review" href="submit.html?id=${restaurant_id}&edit=true&rating=${rating}&title=${title}&date=${VisitedSendParam}&review=${reviewWriting}" style="display: inline-block;">Edit</a> <a id="delete-review" class="delete-review" onclick="deleteReview(${review_id},${loggedin_user_id})" style="display: inline-block;">Delete</a></div>`
        }

        if (reviewSentiment) { 
            sentimentBox = `<p><b>Sentiment Analysis:</b> ${reviewSentiment}</p>`;
        }

        // Dynamically fills in the images based on ratings
        let activestars = '<img src="/images/star_active.png" srcset="/images/star_active@2x.png 2x">'.repeat(rating);
        let inactive = '<img src="/images/star.png" srcset="/images/star@2x.png 2x">'.repeat(5 - rating);

        let reviewcontent =
            `<div class="col">
                    <div
                        class="card row g-0 border overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div class="col-12 col-lg-2 p-4 flex-column position-static">
                            <img id="profile-image" src="${profileImage}" />
                            <span id="name">${firstName} ${lastName}</span>
                            <span id="address">${address}</span>
                        </div>
                        <div class="col-12 col-lg-10 p-4 d-flex flex-column position-static">
                            <div class="stars">
                            ${activestars}${inactive}
                                <span class="total-reviews">${reviewAddedFormatted}</span>
                            </div>
                            <h4>${title}</h4>
                            <p>${reviewWriting}</p>
                            <p><b>Date visited:</b> ${visitedFormatted}</p>
                            ${sentimentBox}
                            ${isThisMyReview}
                        </div>

                    </div>
                </div>`
        individualReviews.insertAdjacentHTML('beforeend', reviewcontent);
    }
}

// Delete review function
const deleteReview = (review_id, user_id) => {
    var response = confirm("Are you sure you want to delete this comment?");
    if (response == true) {
        let payload = {
            review_id: review_id
        }
        
        var deleteReview = new XMLHttpRequest();
            deleteReview.open("DELETE", `/reviews/${user_id}`, true);
            deleteReview.setRequestHeader('Content-Type', "application/json");
            deleteReview.setRequestHeader('Authorization', 'Bearer ' + authorization);
            deleteReview.onload = () => {
                location.reload();
                console.log(deleteReview.response);
            }
            deleteReview.send(JSON.stringify(payload));
            
    }
}