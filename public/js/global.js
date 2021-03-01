// Check current session for token. Items are hidden by default to prevent glitch. 
$(window).on("load", () => {

    // Retrieves token from session storage
    let token = sessionStorage.getItem("token");

    // If token is available, display logout menu
    if (token) {
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('signUpLink').style.display = 'none';
        document.getElementById('userLink').style.display = 'block';
    } else {
        document.getElementById('loginLink').style.display = 'block';
        document.getElementById('signUpLink').style.display = 'block';
        document.getElementById('userLink').style.display = 'none';
    }


});

const register = () => {
    let registerUser = new XMLHttpRequest();
    registerUser.open('POST', '/users/register', true);
    registerUser.setRequestHeader('Content-Type', "application/json");
    registerUser.onload = () => {
        console.log('ok')
    }

    let inputUsername = document.getElementById('inputUsername').value;
    let inputEmail = document.getElementById('inputEmail').value;
    let inputPassword = document.getElementById('inputPassword').value;
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

    registerUser.send(JSON.stringify(payload))
}

const login = () => {
    document.getElementById('incorrectLogin').style.display = 'none';
    let userLogin = new XMLHttpRequest();
    userLogin.open('POST', '/login', true);
    userLogin.setRequestHeader('Content-Type', "application/json");
    userLogin.onload = () => {

        var token = JSON.parse(userLogin.responseText);

        if (token.success == 0) {
            document.getElementById('incorrectLogin').style.display = 'block';
        } else {

            document.getElementById('loginLink').style.display = 'none';
            document.getElementById('signUpLink').style.display = 'none';
            document.getElementById('userLink').style.display = 'block';
            sessionStorage.setItem("token", token.token);
            $('#login').modal('hide');
        
        }
    }

    let loginUsername = document.getElementById('loginUsername').value;
    let loginPassword = document.getElementById('loginPassword').value;

    let payload = {
        username: loginUsername,
        password: loginPassword
    }

    userLogin.send(JSON.stringify(payload))
}

const logout = () => {
    document.getElementById('loginLink').style.display = 'block';
    document.getElementById('signUpLink').style.display = 'block';
    document.getElementById('userLink').style.display = 'none';
    sessionStorage.removeItem('token');
}
