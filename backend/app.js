import express from "express";
const app = express();
import error from "./middleware/error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Route Imports
import user from "./routes/userRoutes.js";
import task from './routes/task.route.js'

app.use("/api/v1", user);
app.use("/api/v1", task);
//Middleware for error
app.use(error);

export default app;