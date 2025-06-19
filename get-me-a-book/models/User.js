import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true},
  name: { type: String },
  username: { type: String, required: true, unique: true},
  profilepic: {
    type: String
  },
  coverpic: {
    type: String
  },
  type: {
    type: String,
    enum: ["donater", "receiver"],
    default: "donater",
    required: true
  },
  description: {
    type: String,
    default: "I need A Book"
  },
  razorpayid: { type: String },
  razorpaysecret: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
