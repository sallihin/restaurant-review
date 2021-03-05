const getRestaurants = (category, container) => { 

    let request = new XMLHttpRequest();

    if (category == "") { 
        // If no parameter is provided, display all listings
        request.open('GET', '/restaurants', true);

    } else { 
        request.open('GET', `/restaurants/cat/${category}`, true);
    }

    request.onload = () => { 
        restaurant_arrays = JSON.parse(request.responseText);
        displayRestaurants(container);
    }

    request.send();
}

const displayRestaurants = container => { 

    // Prepares the container to insert content 
    let columnContainer = document.getElementById(container);
    columnContainer.innerHTML = "";
    
    for (let i = 0; i < restaurant_arrays.length && i < 8; i++) {

        let restaurantId = restaurant_arrays[i].restaurant_id;
        let restaurantName = restaurant_arrays[i].restaurant_name;
        let restaurantPhoto = restaurant_arrays[i].restaurant_photo_1;
        let restaurantRating = getReviewRating(restaurantId);
        let restaurantCategory = "";
        
        // Dynamically fills in the images based on ratings
        let activestars = '<img src="/images/star_active.png" srcset="/images/star_active@2x.png 2x">'.repeat(restaurantRating);
        let inactive = '<img src="/images/star.png" srcset="/images/star@2x.png 2x">'.repeat(5 - restaurantRating);

        // We omit 'categories' from result if searching by category because the SQL query will not return other categories
        if (restaurant_arrays[i].categories) { 
            let arrayCategory = JSON.parse(restaurant_arrays[i].categories); // JSON.parse converts to JS object
            let prettyCategory = arrayCategory.join(", "); // Display as comma separated string
            restaurantCategory = prettyCategory ? prettyCategory : ""; // Ternary operator, display value if available
        }        

        // Uses ES6 Template Literals 
        let column = 
            `<a href="reviews.html?id=${restaurantId}">
                <div class="col slick-slider"> \
                    <div class="card shadow-sm"> \
                        <img src="${restaurantPhoto}" alt="">  \
                        <div class="card-body"> \
                            <h4>${restaurantName}</h4> \
                            <div class="stars"> \
                            ${activestars}${inactive}\
                            </div> \
                            <div class="d-flex justify-content-between align-items-center"> \ 
                                <small class="text-muted">${restaurantCategory}</small> \
                            </div> \
                        </div> \
                    </div> \
                </div>
            </a>`;
        columnContainer.insertAdjacentHTML('beforeend', column);
        
    }
}

// This method calls the API separately and retrieves the ratings
const getReviewRating = (id) => { 
    let rating_arrays = "";

    let request = new XMLHttpRequest();
        request.open('GET', `${rating_url}/${id}`, false);
        request.onreadystatechange = () => { 
            rating_arrays = JSON.parse(request.responseText);
        }
        request.send();

    let totalRating = 0;
    let totalUsers = rating_arrays.length;

    // Sum of all individual rating
    for (let i = 0; i < rating_arrays.length; i++){ 
        totalRating += rating_arrays[i].review_rating; 
    }

    // Divide total ratings by number of user, defaults to 0
    let averageRating = Math.floor(totalRating/totalUsers) || 0;

    return averageRating;    
}

// Prepare slick slider library for Buffet and Cafe slider
$(window).on("load", () => {

    $('.featured-top-slider').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        accessibility: false,
        prevArrow: $('#featured-top .scroll-left'),
        nextArrow: $('#featured-top .scroll-right'),
        responsive: [{
            breakpoint: 560,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2
            }
        }]
    });

    $('.featured-bottom-slider').slick({
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        accessibility: false,
        prevArrow: $('#featured-bottom .scroll-left'),
        nextArrow: $('#featured-bottom .scroll-right'),
        responsive: [
        {
            breakpoint: 560,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2
            }
        }
        ]
    });
 
});