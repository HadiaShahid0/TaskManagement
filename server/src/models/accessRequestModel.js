import mongoose from "mongoose";

const accessRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    module: {
      type: String,
      enum: ["task", "todo"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("AccessRequest", accessRequestSchema);
