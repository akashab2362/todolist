import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  updatePassword,
  updatePasswordReset,
} from "../store/userSlice.js";
import { useAlert } from "react-alert";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, isUpdated, loading } = useSelector((state) => state.user);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Password updated Successfully");
      navigate("/auth/profile");
      dispatch(updatePasswordReset());
    }
  }, [dispatch, error, alert, navigate, isUpdated]);
  return (
    <>
        <div className="rounded-2xl bg-white m-auto">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="LoginSignUpBox">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Update Password
              </h2>
              <form
                action="#"
                method="POST"
                className="mt-8"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Old Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        value={oldPassword}
                        onChange={(e)=>setOldPassword(e.target.value)}
                        placeholder="Old Password"
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
                        New Password{" "}
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="password"
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
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
                        onChange={(e)=>setConfirmPassword(e.target.value)}
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
        </div>
    </>
  );
};

export default UpdatePassword;
