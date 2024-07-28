import React, { useEffect, useState } from "react";
import "./taskCard.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteTask,
  getAllTasks,
  updateCompletionStatus,
} from "../store/taskSlice";
import { editTask } from "../store/taskSlice";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const TodoCard = ({
  _id,
  title,
  description,
  priority,
  deadline,
  isCompleted,
}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error } = useSelector((state) => state.task);
  const navigate = useNavigate();
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const openEditTaskModal = () => {
    setShowEditTaskModal(true);
  };
  const [taskData, setTaskData] = useState({
    newtitle: title,
    newtaskDescription: description,
    newdeadline: new Date(deadline).toISOString().slice(0, -8), // Format date for datetime-local input
    newpriority: priority,
  });
  const { newtitle, newtaskDescription, newdeadline, newpriority } = taskData;
  const handleCheckboxChange = async () => {
    try {
      // Dispatch an action to update the completion status of the task
      await dispatch(
        updateCompletionStatus({ id: _id, isCompleted: !isCompleted })
      );

      // Optionally, you can also fetch all tasks again after updating the completion status
      await dispatch(getAllTasks());

      // Show a success message
      alert.success("Task status updated successfully");
    } catch (error) {
      // Handle errors if any
      alert.error("Failed to update task status");
    }
  };
  const closeEditTaskModal = () => {
    setShowEditTaskModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteTask(_id)).then(() => {
      dispatch(getAllTasks()); // Dispatch getAllTasks after successful deletion
    });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("title", newtitle);
    myForm.set("taskDescription", newtaskDescription);
    myForm.set("deadline", newdeadline);
    myForm.set("priority", newpriority);
    dispatch(editTask({ _id, myForm })).then(() => {
      dispatch(getAllTasks()); // Dispatch getAllTasks after successful editing
      closeEditTaskModal();
    });
  };
  const registerDataChange = (e) => {
    if (e.target.name === "newdeadline") {
      // Ensure the date is in the correct format (YYYY-MM-DDTHH:MM)
      const formattedDate = new Date(e.target.value).toISOString();
      setTaskData({ ...taskData, [e.target.name]: formattedDate });
    } else {
      setTaskData({ ...taskData, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [dispatch, error]);
  const formattedDeadline = formatDate(deadline);
  return (
    <div className="todo-card">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
      />
      <div className="todo-info">
        <h3
          className={`todo-title font-bold ${isCompleted ? "completed" : ""}`}
        >
          {title}
        </h3>
        <p className="todo-description">{description}</p>
      </div>
      <div className="todo-details">
        <p className="todo-deadline">Deadline: {formattedDeadline}</p>
        <p className={`todo-priority priority-${priority.toLowerCase()}`}>
          Priority: {priority}
        </p>
      </div>
      <div className="todo-action">
        <button className="delete-todo" onClick={handleDelete}>
          <DeleteIcon />
        </button>
        <button onClick={openEditTaskModal}>
          <EditIcon />
        </button>
      </div>
      {showEditTaskModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeEditTaskModal}>
              &times;
            </span>
            <div className="addTask">
              <form onSubmit={handleEdit}>
                <h1>Edit Task</h1>
                <div>
                  <input
                    type="text"
                    placeholder="Task name"
                    name="newtitle"
                    onChange={registerDataChange}
                    value={newtitle}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    name="newtaskDescription"
                    value={newtaskDescription}
                    onChange={registerDataChange}
                    required
                  />
                </div>
                <div className="addTaskOptions">
                  <input
                    type="datetime-local"
                    name="newdeadline"
                    onChange={registerDataChange}
                    id="deadline"
                    required
                  />
                  <select
                    name="newpriority"
                    id="priority"
                    value={newpriority}
                    onChange={registerDataChange}
                    required
                  >
                    <option value="p1">Priority 1</option>
                    <option value="p2">Priority 2</option>
                    <option value="p3">Priority 3</option>
                    <option value="p4">Priority 4</option>
                  </select>
                </div>
                <div>
                  <button onClick={closeEditTaskModal}>Cancel</button>
                  <button type="submit">Update Task</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoCard;
