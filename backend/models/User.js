import mongoose from 'mongoose';

// Define the User schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures no two users can register with the same email
    },
    password: {
        type: String,
        required: true
    },
    // CRITICAL: This role determines if the user is a normal customer or an admin
    role: {
        type: String,
        enum: ['customer', 'admin'], // Only allows these two values
        default: 'customer'
    }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' fields

// Check if the model already exists to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
