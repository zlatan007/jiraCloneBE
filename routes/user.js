const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "firstName, email, and password are required.",
            });
        }
        await User.create({
            firstName,
            lastName,
            email,
            password
        });

        return res.status(200).json({
            success: true,
            message: "Login Successful."
        });

    } catch (err) {
        console.log("error", err);

        if (err.code === 11000 && err.keyValue?.email) {
            return res.status(409).json({
                success: false,
                message: "Email already exists.",
            });
        }

        if (err.name === "ValidationError") {
            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: "Validation failed.",
                errors,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
})

module.exports = router;