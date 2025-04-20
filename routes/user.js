const { Router } = require("express");
const User = require("../models/user");
const { createToken } = require("../services/user");

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
        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        });

        console.log("user", user)

        const token = createToken(user);

        user.token = token;

        await user.save();

        

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
});

router.post("/signin", async function (req, res) {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);

        const user = await this.findOne({ email });

        const userDetails = {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            role: user?.role,
        }
        return res.status(200).json({ success: true, token, userDetails });
    } catch (error) {
        return res.status(400).json({ sucess: false, error });
    }
})

module.exports = router;