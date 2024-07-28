import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loadUser,
  updateProfile,
  updateProfileReset,
} from "../store/userSlice.js";
import { useAlert } from "react-alert";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/vite.svg");
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Profile updated Successfully");
      dispatch(loadUser());
      navigate("/auth/profile");
      dispatch(updateProfileReset());
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);
  return (
    <>
        <div className="bg-white rounded-2xl m-auto">
          <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <div className="LoginSignUpBox">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Update Profile
              </h2>
              <form
                action="#"
                method="POST"
                className="mt-8"
                onSubmit={updateProfileSubmit}
              >
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Full Name{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        required
                        value={name}
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        id="name"
                      ></input>
                    </div>
                  </div>
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

                  {/* Image Upload */}
                  <div id="registerImage" className="flex ">
                    <img
                      src={avatarPreview}
                      className="w-7 mr-3"
                      alt="Avatar Preview"
                    />
                    <input
                      type="file"
                      name="avatar"
                      accept="iamge/*"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Update Profile <ArrowRight className="ml-2" size={16} />
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

export default UpdateProfile;
