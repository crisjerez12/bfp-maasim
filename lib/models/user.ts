import mongoose, { Schema } from "mongoose";

// Define the interface for the User document
export interface IUser {
  username: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema for the User model
const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    role: String,
  },
  {
    timestamps: true,
  }
);

// Create and export the User model
const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserModel;
