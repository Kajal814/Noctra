
import mongoose from "mongoose";

// Define the structure of a user
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        }
    },
    {
        timestamps: true
    }
);

// Create the User model
const User = mongoose.model("User", userSchema);

export default User;
