// Checks the URL for category or search parameters 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category');
const search = urlParams.get('query');

$(window).on("load", () => {
    if (category) { 
        document.getElementsByClassName('breadcrumb')[0].innerHTML = `<a href="index.html">Home</a> /  ${category}`;
        document.getElementsByClassName('header')[0].innerHTML = `<h2>${category}</h2>`;
    } else if (search) { 
        document.getElementsByClassName('breadcrumb')[0].innerHTML = `<a href="index.html">Home</a> /  Search Results for '${search}'`;
        document.getElementsByClassName('header')[0].innerHTML = `<h2>${search}</h2>`;
        document.getElementById('searchinput').setAttribute('placeholder',search);
    }
    getRestaurants(category, search);
});

const getRestaurants = (category, search) => { 

    let request = new XMLHttpRequest();

    // Runs different query depending on the parameters in the URL
    if (category) { 
        request.open('GET', `/restaurants/cat/${category}`, true);        
    } else if (search) { 
        request.open('GET', `/restaurants/search/${search}`, true);
    } else { 
        request.open('GET', '/restaurants/', true);
    } 

    request.onload = () => { 
        restaurant_arrays = JSON.parse(request.responseText);
        displayRestaurants();
    }
    request.send();
}

const displayRestaurants = () => { 

    // Prepares the container for content insertion
    let columnContainer = document.getElementById('restaurant-listing');
    columnContainer.innerHTML = "";
    
    for (let i = 0; i < restaurant_arrays.length; i++) {
        let restaurantId = restaurant_arrays[i].restaurant_id;
        let restaurantName = restaurant_arrays[i].restaurant_name;
        let restaurantPhoto = restaurant_arrays[i].restaurant_photo_1;
        let restaurantAddress = restaurant_arrays[i].restaurant_address;
        let restaurantRating = getReviewRating(restaurantId);

        let restaurantCategory = "";
        let restaurantTelephone = "";
        let restaurantMenu = "";
        let restaurantUrl = "";
                
        // Dynamically fills in the images based on ratings
        let activestars = '<img src="/images/star_active.png" srcset="/images/star_active@2x.png 2x">'.repeat(restaurantRating);
        let inactive = '<img src="/images/star.png" srcset="/images/star@2x.png 2x">'.repeat(5 - restaurantRating);

        // We omit 'categories' from result if searching by category
        if (restaurant_arrays[i].categories) { 
            let arrayCategory = JSON.parse(restaurant_arrays[i].categories); // JSON.parse converts to JS object
            let prettyCategory = arrayCategory.join(", "); // Display as comma separated string
            restaurantCategory = prettyCategory ? prettyCategory : ""; // Ternary operator, display value if available
        }        

        if (restaurant_arrays[i].restaurant_telephone) { 
            restaurantTelephone = `<span class="telephone">${restaurant_arrays[i].restaurant_telephone}</span>`;
        }
        
        if (restaurant_arrays[i].restaurant_menu) { 
            restaurantMenu = `<a class="ext-link" href="${restaurant_arrays[i].restaurant_menu}" target="_blank">Menu</a>`;
        }

        if (restaurant_arrays[i].restaurant_url) { 
            restaurantUrl = `<a class="ext-link" href="${restaurant_arrays[i].restaurant_url}" target="_blank">Website</a>`;
        }

        // Uses ES6 Template Literals 
        let column = 
            `<div class="col">
                    <div class="card row g-0 border overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"> 
                        <a href="reviews.html?id=${restaurantId}" class="col-12 col-lg-3 col-md-5 col-sm-12 thumbnail" style="background-image: url('${restaurantPhoto}'); background-size: cover; background-position: center;"></a>
                        <div class="col p-4 d-flex flex-column position-static">
                            <a href="reviews.html?id=${restaurantId}"><h3>${restaurantName}</h3></a>
                            <div class="stars">
                                    ${activestars}${inactive}
                                <span class="total-reviews">${total_users || 0} Reviews</span> 
                            </div>
                            <div class="py-1 d-flex justify-content-between align-items-center"> 
                                <small class="text-muted">${restaurantCategory}</small> 
                            </div>
                            <div class="secondary-info row d-flex justify-content-between align-items-center"> 
                                <div class="col-12 col-lg-7 py-1">${restaurantAddress}</span></div>
                                <div class="col-12 col-lg-5 py-1 text-lg-end"> 
                                    ${restaurantTelephone}
                                    ${restaurantMenu}
                                    ${restaurantUrl}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
        columnContainer.insertAdjacentHTML('beforeend', column);
    }
}

// This method calls the API separately and retrieves the ratings 
const getReviewRating = (id) => { 
    let rating_arrays = "";

    let request = new XMLHttpRequest();
    request.open('GET', `${rating_url}/${id}`, false);
    request.onload = () => { 
        rating_arrays = JSON.parse(request.responseText);
    }
    request.send();

    let totalRating = 0;
    let totalUsers = rating_arrays.length;

    // Hotfix for bug displaying wrong total reviews per restaurants 
    total_users = totalUsers;

    // Sum of all individual rating
    for (let i = 0; i < rating_arrays.length; i++){ 
        totalRating += rating_arrays[i].review_rating; 
    }

    // Divide total ratings by number of user, defaults to 0
    let averageRating = Math.floor(totalRating/totalUsers) || 0;

    return averageRating;    
}