import { ErrorHandler } from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModels.js";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});