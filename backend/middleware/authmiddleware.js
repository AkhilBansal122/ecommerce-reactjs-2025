const jwt = require('jsonwebtoken');
const tokenBlacklist = [];

module.exports = {
    adminverifyToken: async (req, res, next) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer token"

            if (!token) {
                return res.status(401).json({ status: false, message: "Unauthorized" });
            }

            // Check if the token is blacklisted
            if (tokenBlacklist.includes(token)) {
                return res.status(401).json({
                    status: false,
                    message: 'This token has been logged out'
                });
            }

            // Verify the token using JWT_SECRET from the environment
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        status: false,
                        message: 'Token is invalid or expired'
                    });
                }

                // Attach the decoded user info to the request object
                req.user = decoded;
                next();  // Proceed to the next middleware or route handler
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: error.message
            });
        }
    },
    adminlogout : async (req, res) => {

        const token = req.headers['authorization'].split(' ')[1];
        if (token) {
            tokenBlacklist.push(token);
    
            return res.json({
                status: true,
                message: 'Logout successfully'
            });
        }
        return res.status(401).json({
            status: false,
            message: 'Unauthorized'
        });
    }
    
    
};
