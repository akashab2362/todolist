import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { Task } from "../models/tasks.model.js";
export const createTask = catchAsyncError(async (req, res, next) => {
  const task = await Task.create({ ...req.body, user: req.user._id });
  res.status(201).json({
    success: true,
    task,
  });
});

export const updateTask = catchAsyncError(async (req, res, next) => {
  let task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }
  res.status(200).json({
    success: true,
    task,
  });
});

export const deleteTask = catchAsyncError(async (req, res, next) => {
  let task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }
  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

export const getAllTasks = catchAsyncError(async (req, res, next) => {
  let tasks = await Task.find({ user: req.user._id });
  res.status(200).json({
    success: true,
    tasks,
  });
});

export const getNearbyTasks = catchAsyncError(async (req, res, next) => {
  const currentDate = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(currentDate.getDate() + 3);

  const tasks = await Task.find({
    user: req.user._id, // Filter tasks by the user's ID
    deadline: { $gte: currentDate, $lte: threeDaysLater },
  });

  res.status(200).json({
    success: true,
    tasks,
  });
});

export const updateTaskCompletionStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { isCompleted } = req.body;

  // Validate if isCompleted is provided
  if (isCompleted === undefined || typeof isCompleted !== "boolean") {
    return next(new ErrorHandler("Please provide a valid value for isCompleted", 400));
  }

  // Find the task by ID
  let task = await Task.findById(id);
  
  // Check if task exists
  if (!task) {
    return next(new ErrorHandler("Task not found", 404));
  }

  // Update isCompleted field
  task.isCompleted = isCompleted;
  await task.save();

  res.status(200).json({
    success: true,
    task,
  });
});

