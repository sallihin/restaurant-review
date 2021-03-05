// Checks the URL for restaurant id
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const restaurant_id = urlParams.get('id');
const isEditReview = urlParams.get('edit');
const editRating = urlParams.get('rating');
const editTitle = urlParams.get('title');
const editDate = urlParams.get('date');
const editWriting = urlParams.get('review');
const user_id = sessionStorage.getItem("user_id");
const authorization = sessionStorage.getItem("token");
let restaurantName = "";

$(window).on("load", () => {
    if (!restaurant_id || !token) {
        alert("Invalid user/id. Redirect to homepage.");
        window.location.replace(`reviews.html?id=${restaurant_id}`);
    }

    if (isEditReview) {
        if (editRating == 5) { 
            document.getElementById("star5").checked = true;
        } else if (editRating == 4) { 
            document.getElementById("star4").checked = true;
        } else if (editRating == 3) { 
            document.getElementById("star3").checked = true;
        } else if (editRating == 2) { 
            document.getElementById("star2").checked = true;
        } else if (editRating == 1) { 
            document.getElementById("star1").checked = true;
        } 
        document.getElementById('review_title').value = editTitle;
        document.getElementById('review_writeup').value = editWriting;
        document.getElementById('review_visited').value = editDate;
    }
});

const getRestaurants = () => {
    let request = new XMLHttpRequest();
        request.open('GET', `/restaurants/${restaurant_id}`, true);
        request.onload = () => {
            restaurant_arrays = JSON.parse(request.responseText);
            restaurant_name = restaurant_arrays[0].restaurant_name;
            // console.log(restaurant_arrays);
            displayRestaurant();
        }
        request.send();
}

const displayRestaurant = () => {
    let breadcrumbContainer = document.getElementById('breadcrumb');
    let breadcrumb = `<span class="breadcrumb"><a href="index.html">Home</a> / <a href="restaurants.html">Restaurants</a> / <a href="reviews.html?id=${restaurant_id}">${restaurant_name}</a> / Submit Review </span>`;
    breadcrumbContainer.insertAdjacentHTML('beforeend', breadcrumb);

    let submitHeaderContainer = document.getElementById('submit-header');
    let submitheader = 
            `<div class="col col-lg-8 ">
                <span>You are reviewing</span><h1>${restaurant_name}</h1></div>
                <div class="col col-lg-4 text-lg-end">
                <a class="btn-visit" href="reviews.html?id=${restaurant_id}">View Restaurant Page</a>
            </div>`;
     submitHeaderContainer.insertAdjacentHTML('beforeend', submitheader);
}

const submitReview = () => {

    // Reset error message
    document.getElementById('error-message').style.display = 'none';
   
    let review_rating = 0;
    if (document.getElementById('star1').checked) { 
        review_rating = 1;
    } else if (document.getElementById('star2').checked) { 
        review_rating = 2;
    } else if (document.getElementById('star3').checked) { 
        review_rating = 3;
    } else if (document.getElementById('star4').checked) { 
        review_rating = 4;
    } else if (document.getElementById('star5').checked) { 
        review_rating = 5;
    }

    let review_title = document.getElementById('review_title').value;
    let review_writeup = document.getElementById('review_writeup').value;
    let review_visited = document.getElementById('review_visited').value;
    let review_photo_1 = "";
    let review_photo_2 = "";

    if (!review_title || !review_writeup || !review_visited) { 
        document.getElementById('error-message').style.display = 'block';
    } else { 
        let payload = {
            restaurant_id: restaurant_id,
            review_rating: review_rating,
            review_title: review_title,
            review_writeup: review_writeup,
            review_photo_1: review_photo_1,
            review_photo_2: review_photo_2,
            review_visited: review_visited
        }
        let submitXHR = new XMLHttpRequest();
            if (isEditReview) { 
                submitXHR.open('PUT', `/reviews/${user_id}`, true);
            } else { 
                submitXHR.open('POST', `/reviews/${user_id}`, true);
            }
            submitXHR.setRequestHeader('Content-Type', "application/json");
            submitXHR.setRequestHeader('Authorization', 'Bearer ' + authorization);
            submitXHR.onload = () => {
                console.log(JSON.parse(submitXHR.responseText));
                window.location.replace(`reviews.html?id=${restaurant_id}`);
            }
            console.log(JSON.stringify(payload));
            submitXHR.send(JSON.stringify(payload));
    }

    
}
