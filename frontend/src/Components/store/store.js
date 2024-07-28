import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice.js'
import taskReducer from './taskSlice.js';
export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer
  },
});
