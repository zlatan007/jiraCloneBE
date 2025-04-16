const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  }
});

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
      .update(user.password)
      .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
})

const User = model("user", userSchema);

module.exports = User;