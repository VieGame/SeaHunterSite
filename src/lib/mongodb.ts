import mongoose from 'mongoose';

// Connect to MongoDB
export default async function connectDB() {
    if (mongoose.connections[0].readyState) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || '');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}