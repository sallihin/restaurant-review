// Check current session for token. Items are hidden by default to prevent glitch. 
$(window).on("load", () => {

    // Retrieves token from session storage
    token = sessionStorage.getItem("token");
    let name = sessionStorage.getItem("name");

    // If token is available, display name and logout menu
    if (token) {
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('signUpLink').style.display = 'none';
        document.getElementById('userLink').style.display = 'block';
        document.getElementById('profile').innerHTML = `<b>Hello, ${name}!</b>`;
    } else {
        document.getElementById('loginLink').style.display = 'block';
        document.getElementById('signUpLink').style.display = 'block';
        document.getElementById('userLink').style.display = 'none';
    }
});

const register = () => {

    // Reset form error message
    document.getElementById('please-fill-everything').style.display = 'none';
    document.getElementById('password-not-match').style.display = 'none';

    let inputUsername = document.getElementById('inputUsername').value;
    let inputEmail = document.getElementById('inputEmail').value;
    let inputPassword = document.getElementById('inputPassword').value;
    let inputPassword2 = document.getElementById('inputPassword2').value;
    let inputFirstName = document.getElementById('inputFirstName').value;
    let inputLastName = document.getElementById('inputLastName').value;
    let inputGender = document.getElementById('inputGender').value;
    let inputMobile = document.getElementById('inputMobile').value;
    let inputAddress = document.getElementById('inputAddress').value;

    let payload = {
        user_login: inputUsername,
        user_password: inputPassword,
        user_email: inputEmail,
        user_firstname: inputFirstName,
        user_lastname: inputLastName,
        user_gender: inputGender,
        user_mobile: inputMobile,
        user_address: inputAddress
    }

    if (!inputUsername || !inputEmail || !inputPassword || !inputPassword2 || !inputFirstName || !inputLastName || !inputGender || !inputMobile || !inputAddress) { 
        
        // Simple form validation to check if all fields are filled
        document.getElementById('please-fill-everything').style.display = 'block';

    } else if (inputPassword != inputPassword2) { 
        
        // Check if both password fields have similar values
        document.getElementById('password-not-match').style.display = 'block';

    } else { 

        // Execute XHR after form validation
        let registerUser = new XMLHttpRequest();
            registerUser.open('POST', '/users/register', true);
            registerUser.setRequestHeader('Content-Type', "application/json");
            registerUser.onload = () => {
                if (registerUser.status == 200) {
                    closeSignupOpenSuccess();
                }
            }
            registerUser.send(JSON.stringify(payload))
    }
}

const login = () => {

    // Reset error message 
    document.getElementById('incorrectLogin').style.display = 'none';

    // Connects to XHR before validation
    let userLogin = new XMLHttpRequest();
        userLogin.open('POST', '/login', true);
        userLogin.setRequestHeader('Content-Type', "application/json");
        userLogin.onload = () => {

        var token = JSON.parse(userLogin.responseText);

        if (token.success == 0) {
            // Display error if login is incorrect
            document.getElementById('incorrectLogin').style.display = 'block';
        } else {
            document.getElementById('loginLink').style.display = 'none';
            document.getElementById('signUpLink').style.display = 'none';
            document.getElementById('userLink').style.display = 'block';
            sessionStorage.setItem("token", token.token);
            sessionStorage.setItem("name", token.name);
            sessionStorage.setItem("user_id", token.user_id);
            document.getElementById('profile').innerHTML = `<b>Hello, ${token.name}!</b>`;
            $('#login').modal('hide');
            if (window.location.pathname == '/reviews.html') {
                location.reload();
            }
        }
    }
    let loginUsername = document.getElementById('loginUsername').value;
    let loginPassword = document.getElementById('loginPassword').value;
    let payload = {
        username: loginUsername,
        password: loginPassword
    }
    userLogin.send(JSON.stringify(payload));
}

const logout = () => {

    // Reset UI to logged out state
    document.getElementById('loginLink').style.display = 'block';
    document.getElementById('signUpLink').style.display = 'block';
    document.getElementById('userLink').style.display = 'none';

    // Removes session storage stored in browser
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('name');

    // If current page is review page, force reload page to reset state
    if (window.location.pathname == '/reviews.html') {
        location.reload();
    }

}

const closeLoginOpenSignup = () => {
    $('#login').modal('hide');
    $('#register').modal('show');
}

const closeSignupOpenLogin = () => {
    $('#login').modal('show');
    $('#register').modal('hide');
}

const closeSignupOpenSuccess = () => {
    $('#register').modal('hide');
    $('#success').modal('show');
}