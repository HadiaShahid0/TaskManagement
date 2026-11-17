import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      uploadedAt: Date.now,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    permissions: {
      task: {
        type: Boolean,
        default: false,
      },

      todo: {
        type: Boolean,
        default: false,
      },
    },
    
    mustChangePassword: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
