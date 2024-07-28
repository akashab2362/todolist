import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../store/userSlice.js";
import { useAlert } from "react-alert";
const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { token } = useParams();
  const { error, success, loading } = useSelector((state) => state.user);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(
      resetPassword({ token, passwords: { password, confirmPassword } })
    );
  };
  useEffect(() => {
    if (error) {
      alert.error(error.message);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Password updated Successfully");
      navigate("/auth/login");
    }
  }, [dispatch, error, alert, navigate, success]);
  return (
    <>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 m-auto">
        <div className="LoginSignUpBox">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Update Password
          </h2>
          <form
            action="#"
            method="POST"
            className="mt-8"
            onSubmit={resetPasswordSubmit}
          >
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    New Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New Password"
                    name="password"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Confirm New Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    name="password"
                  ></input>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Update Password <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
