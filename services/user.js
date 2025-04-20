const jwt = require("jsonwebtoken");

const secret = "$uperMan@123";

function createToken (user) {
    const payload = {
        _id: user._id,
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        role: user?.role
    }

    const token = jwt.sign(payload, secret);

    return token;
}

module.exports = {
    createToken,
}