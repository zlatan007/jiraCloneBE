const { Router } = require("express");
const User = require("../models/user");
const { createToken } = require("../services/user");

const router = Router();

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).lean();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not find.",
            });
        }

        const userDetails = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        return res.status(200).json({
            success: true,
            data: { ...userDetails }
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
});
module.exports = router;