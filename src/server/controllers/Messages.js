const Users = require('../services/Users');
const Message = require('../services/Messages');
// Use a library to perform the cryptographic operations
const jwt = require("jsonwebtoken")
const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"


// Ensure that the user sent a valid token
const isLoggedIn = (req, res, next) => {
    // If the request has an authorization header
    if (req.headers.authorization) {
        // Extract the token from that header
        const token = req.headers.authorization.split(" ")[1];
        // const tokenObject = JSON.parse(token);
        // const extractedToken = tokenObject.token;
        try {
            // Verify the token is valid
            const data = jwt.verify(token, key, { algorithm: 'HS256' });
            // Token validation was successful. Continue to the actual function (index)
            res.locals.username = data.username;
            return next()
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
    }
    else
        return res.status(403).send('Token required');
}


const getUserByUsername = async (req, res) => {
    const user = await Users.getUserByUsername(req.params.username);
    if (!user) {
        return res.status(404).json({ errors: ['User not exist'] });
    }
    res.json({ username: user.username, displayName: user.displayName, profilePic: user.profilePic })
};


module.exports = { createUserPassName, getUserByUsername, isLoggedIn };
