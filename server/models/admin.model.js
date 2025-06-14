import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordTokenExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.methods = {
  generateAccessToken: async function () {
    const admin = this.toObject();
    const token = jwt.sign(
      { id: admin._id, email: admin.email, fullName: admin.fullName },
      process.env.ADMIN_SECRET_KEY,
      { expiresIn: "15m" }
    );
    return token;
  },
  comparePassword: async function (plainText) {
    return await bcrypt.compare(plainText, this.password);
  },

  generateRefreshToken: async function () {
    const admin = this.toObject();
    const refreshToken = jwt.sign(
      { id: admin._id, email: admin.email, fullName: admin.fullName },
      process.env.ADMIN_REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );
    return refreshToken;
  },
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
