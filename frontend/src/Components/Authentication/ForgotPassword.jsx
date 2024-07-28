import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../store/userSlice.js";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const { error, message, loading } = useSelector((state) => state.user);
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);
  return (
    <>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 m-auto">
        <div className="LoginSignUpBox">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Forgot Password
          </h2>
          <form
            action="#"
            method="POST"
            className="mt-8"
            onSubmit={forgotPasswordSubmit}
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    id="email"
                  ></input>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Send <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
