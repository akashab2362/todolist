import React, { useEffect } from "react";
import TaskCard from "./TaskCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./myTask.css";
import { getUpcomingTasks, clearTaskError } from "../store/taskSlice.js";
const NotifyTasks = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { upcomingTasks, error } = useSelector((state) => state.task);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearTaskError());
    }
    dispatch(getUpcomingTasks());
  }, [dispatch, alert, error]);
  return (
    <div className="taskContainer">
      <div className="taskTitle">
        <h1 className="text-3xl font-bold">Upcoming Tasks</h1>
      </div>
      {upcomingTasks &&
        upcomingTasks.map((task) => (
          <TaskCard
            key={task._id}
            _id={task._id}
            title={task.title}
            description={task.taskDescription}
            priority={task.priority}
            deadline={task.deadline}
          />
        ))}
    </div>
  );
};

export default NotifyTasks;
