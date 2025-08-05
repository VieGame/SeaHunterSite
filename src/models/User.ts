import mongoose, { InferRawDocType, Schema } from 'mongoose';
export const USER_GENDER = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
} as const;

// Define schema without complex query helpers for now
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    fullname: {
        type: String,
    },
    avatar: String,
});

export type UserDocument = InferRawDocType<typeof UserSchema>;

// Create and export the model
const UserModel = (mongoose.models.User ||
    mongoose.model('User', UserSchema));

export default UserModel;