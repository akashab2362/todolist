import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreateIcon from "@mui/icons-material/Create";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/userSlice.js";
import "./navbar.css";
import { useAlert } from "react-alert";
import { createTask, getAllTasks } from "./store/taskSlice.js";
const Navbar = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [collapse, setCollapse] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const openAddTaskModal = () => {
    setShowAddTaskModal(true);
  };
  const [taskData, setTaskData] = useState({
    title: "",
    taskDescription: "",
    deadline: null,
    priority: "p1",
  });
  const { title, taskDescription, deadline, priority } = taskData;
  const closeAddTaskModal = () => {
    setShowAddTaskModal(false);
  };
  const handleLogout = () => {
    dispatch(logout()).then(() => {
      alert.success("Logout Successfully");
      navigate("/");
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("taskDescription", taskDescription);
    myForm.set("deadline", deadline);
    myForm.set("priority", priority);
    dispatch(createTask(myForm)).then(() => {
      alert.success("Task created successfully");
      closeAddTaskModal();
      dispatch(getAllTasks);
    });
  };
  const registerDataChange = (e) => {
    if (e.target.name === "deadline") {
      // Ensure the date is in the correct format (YYYY-MM-DDTHH:MM)
      const formattedDate = new Date(e.target.value).toISOString();
      setTaskData({ ...taskData, [e.target.name]: formattedDate });
    } else {
      setTaskData({ ...taskData, [e.target.name]: e.target.value });
    }
  };
  return (
    <div className="main-container">
      <nav className={`sideContainer ${collapse && "sidebar-collapse"}`}>
        <div className="top">
          <div className="dropdown">
            <button className="dropbtn">
              {user && user.avatar ? (
                <img
                  src={user.avatar.url}
                  alt="User Avatar"
                  className="avatar"
                />
              ) : (
                <AccountCircleIcon />
              )}
              {user && user.name}
            </button>
          </div>
          <button
            className="sidebar-button util-buttons"
            onClick={() => {
              navigate("/notifications");
            }}
          >
            <NotificationsIcon />
          </button>
          <button
            className=" util-buttons"
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            <MenuOutlinedIcon />
          </button>
        </div>
        <div className="middle">
          {isAuthenticated ? (
            <ul className="menu-options">
              <li>
                <button id="addtask" onClick={openAddTaskModal}>
                  <AddTaskIcon />
                  Add Task
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/task");
                  }}
                >
                  <ListRoundedIcon />
                  My Tasks
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/auth/profile");
                  }}
                >
                  <AccountBoxIcon />
                  My Profile
                </button>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <LogoutIcon />
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="menu-options">
              <li>
                <button>
                  <LoginIcon />
                  <Link to="/auth/login">Login</Link>
                </button>
              </li>
              <li>
                <button>
                  <CreateIcon />
                  <Link to="/auth/register">Signup</Link>
                </button>
              </li>
            </ul>
          )}
        </div>
        <div className="bottom">
          <p>
            Task<span>Master</span>
          </p>
        </div>
      </nav>
      <div className={`open-menu ${!collapse && "hide"}`}>
        <button
          onClick={() => {
            setCollapse(!collapse);
          }}
        >
          <MenuOutlinedIcon />
        </button>
      </div>
      {showAddTaskModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeAddTaskModal}>
              &times;
            </span>
            <div className="addTask">
              <form onSubmit={handleSubmit}>
                <h1>Add a Task</h1>
                <div>
                  <input
                    type="text"
                    placeholder="Task name"
                    name="title"
                    onChange={registerDataChange}
                    value={title}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    name="taskDescription"
                    value={taskDescription}
                    onChange={registerDataChange}
                    required
                  />
                </div>
                <div className="addTaskOptions">
                  <input
                    type="datetime-local"
                    name="deadline"
                    onChange={registerDataChange}
                    id="deadline"
                    required
                  />
                  <select
                    name="priority"
                    id="priority"
                    onChange={registerDataChange}
                    required
                  >
                    <option value="p1">Priority 1</option>
                    <option value="p2">Priority 2</option>
                    <option value="p3">Priority 3</option>
                    <option value="p4" defaultChecked>
                      Priority 4
                    </option>
                  </select>
                </div>
                <div>
                  <button onClick={closeAddTaskModal}>Cancel</button>
                  <button type="submit">Add Task</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Navbar;
