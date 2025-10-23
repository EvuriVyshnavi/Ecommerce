import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Use the URI from the environment variables (loaded via dotenv)
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;