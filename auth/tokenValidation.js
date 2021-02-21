const { verify, decode } = require('jsonwebtoken');

const checkToken = (role = []) => {  

    return (request, respond, next) => { 

        // Retrieve the token parameter from request body 
        let token = request.get("authorization");

        if (token) {

            // This removes the "Bearer " from the token string 
            token = token.slice(7);

            // This decodes the JSON Web Token back into regular JSON
            let decoded = decode(token);

            // Checks if the token is valid 
            verify(token, process.env.JSONTOKEN_KEY, (error) => {
                
                // Check if the user role is authorised
                if (error) {
                    respond.json({
                        success: 0,
                        message: "Invalid token"
                    });
                } 
                else {

                    // Check if the user's role is allowed
                    if (role.includes(decoded.result.user_role)) { 

                        // Users can only update/delete their own posts
                        // No additional checks for admin 
                        if (decoded.result.user_role == 'user' && request.params.id != decoded.result.user_id) { 
                            respond.json({ 
                                success: 0, 
                                message: "You cannot modify/delete another user's data",
                            });
                            return error;
                        }

                        return next();
                    }

                    else { 
                        respond.json({
                            success: 0,
                            message: "Unauthorized User"
                        })
                    }
                }
            })

        } else {
            respond.json({
                success: 0,
                message: "Please log in / provide token to access API"
            })
        }
    } 
}

module.exports = checkToken
