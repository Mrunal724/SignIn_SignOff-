const mongoose = require('mongoose');
const { Schema } = mongoose;
const JWT = require('jsonwebtoken');

const userSchema = new Schema({

    name: {
        type: String,
        required: [true, "User name is required"],
        minLength: [5, "Name must be at least 5 character"],
        maxLenght: [50, "Name must be less than 50 character"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        lowercase: true,
        unique: [true, "Already registered email"]
    },
    password: {
        type: String,
        select: false
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordExpiryDate: {
        type: String,
    }
}, {
    timestamps: true
});

userSchema.methods = {
    jwtToken() {
        return JWT.signin(
            { id: this._id, email: this.email },
            process.env.SECRET,
            {
                expiresIn: '24hrs'
            }
        )
    }
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;