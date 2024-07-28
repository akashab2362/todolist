import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  tasks: [],
  error: null,
  task: {},
  message: null,
  success: false,
  upcomingTasks: [],
  isCompleted: false
};

export const createTask = createAsyncThunk(
  "task/createTask",
  async (taskData) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/task/create",
        taskData,
        config
      );
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const getAllTasks = createAsyncThunk("task/getAllTasks", async () => {
  try {
    const { data } = await axios.get(`/api/v1/task/tasks`);
    return data.tasks;
  } catch (err) {
    throw err.response.data.message;
  }
});

export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  try {
    const { data } = await axios.delete(`/api/v1/task/delete/${id}`);
    return data;
  } catch (err) {
    throw err.response.data.message;
  }
});

export const editTask = createAsyncThunk(
  "task/editTask",
  async ({ _id, myForm }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/task/update/${_id}`,
        myForm,
        config
      );
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const getUpcomingTasks = createAsyncThunk(
  "task/getUpcomingTasks",
  async () => {
    try {
      const { data } = await axios.get(`/api/v1/task/getNearbyTasks`);
      return data.tasks;
    } catch (err) {
      throw err.response.data.message;
    }
  }
);

export const updateCompletionStatus = createAsyncThunk("task/updateCompletionStatus",
async ({id, isCompleted})=>{
  try{
    const {data} = await axios.put(`/api/v1/task/updateCompletionStatus/${id}`, {isCompleted});
    return data.task;
  }catch(error)
  {
    throw error.response.data.message;
  }
})

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    clearTaskError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        state.taskCount = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
        state.success = action.payload.success;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editTask.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload.task;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUpcomingTasks.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUpcomingTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingTasks = action.payload;
      })
      .addCase(getUpcomingTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCompletionStatus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCompletionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isCompleted = action.payload.isCompleted;
      })
      .addCase(updateCompletionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});
export const { clearTaskError } = taskSlice.actions;
export default taskSlice.reducer;
