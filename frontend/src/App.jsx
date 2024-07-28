import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Authentication/Login.jsx";
import Register from "./Components/Authentication/Register.jsx";
import Home from "./Components/Home/Home.jsx";
import MyTasks from './Components/Tasks/MyTasks.jsx'
import { loadUser } from "./Components/store/userSlice.js";
import { useEffect } from "react";
import { store } from "./Components/store/store.js";
import MyProfile from './Components/Authentication/MyProfile.jsx'
import UpdateProfile from './Components/Authentication/UpdateProfile.jsx'
import ChangePassword from './Components/Authentication/ChangePassword.jsx'
import ForgotPassword from './Components/Authentication/ForgotPassword.jsx'
import ResetPassword from './Components/Authentication/ResetPassword.jsx'
import NotifyTasks from './Components/Tasks/NotifyTasks.jsx'
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path:"/task",
          element:<MyTasks/>
        },
        {
          path:"/auth/profile",
          element:<MyProfile/>
        },
        {
          path:"/auth/me/update",
          element:<UpdateProfile/>
        },
        {
          path:"/auth/forgot",
          element:<ForgotPassword/>
        },
        {
          path:"/password/reset/:token",
          element:<ResetPassword/>
        },
        {
          path:"/auth/me/changePassword",
          element:<ChangePassword/>
        },
        {
          path:"/notifications",
          element:<NotifyTasks/>
        }
      ],
    },
    {
      path:"/auth/login",
      element: <Login/>
    },
    {
      path: "/auth/register",
      element: <Register/>
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
