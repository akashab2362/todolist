import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please Enter the title of the task"],
    },
    taskDescription: String,
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    deadline: {
      type: Date,
      default: null,
    },
    priority: {
      type: String,
      enum: ["p1", "p2", "p3", "p4"],
      default: "p4",
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
