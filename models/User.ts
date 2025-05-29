import mongoose, { Schema, Document, Types } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  name?: string;
  parentName?: string;
  isCompleted?: boolean;
  createdAt?: Date;
  childName?: string;
  childBirthDate?: Date;
  childGender?: string;
  measurements?: Types.ObjectId[]; // Array of measurement references
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  parentName: { type: String },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  childName: { type: String },
  childBirthDate: { type: Date },
  childGender: { type: String },
  measurements: {
    type: [{ type: Schema.Types.ObjectId, ref: "Measurement" }],
    default: [],
  },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
