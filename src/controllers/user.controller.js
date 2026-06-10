// check bearer token in auth header
// validate token with secret
// if available return user details else error

import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const user = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        // 1. Check if Authorization header exists and starts with "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied. No token provided.",
            });
        }

        // 2. Extract the raw token string
        const token = authHeader.split(" ")[1];

        // 3. Verify the token string (FIXED: Passed token directly as a string)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // 4. Find user using the ID stored in the token payload
        const userDetails = await User.findById(decoded.id).select("-password");

        // 5. If user does not exist in DB, return error
        if (!userDetails) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        // 6. Return user details
        res.status(200).json({
            user: userDetails,
        });

    } catch (error) {
        // Handle specific JWT errors gracefully
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token." });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired." });
        }

        res.status(500).json({
            message: error.message,
        });
    }
};
