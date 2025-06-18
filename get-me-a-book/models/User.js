import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String },
    username: { type: String, required: true },
    profilepic: { type: String},
    coverpic: { type: String},
    type: {
        type: String,
        enum: ['donater', 'receiver'],
        required: true,
        default: 'donater', // optional default
    },
    description: {
        type: String,
        required: true,
        default: "I need A Book"
    },
    razorpayid: { type: String},
    razorpaysecret: { type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Optional: update `updatedAt` automatically on save
UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.models.User || model("User", UserSchema);
