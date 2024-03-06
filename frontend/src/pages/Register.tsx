import React, { useContext, useEffect, useState } from "react";
import MailSvg from "../assets/MailSvg";
import UserSvg from "../assets/UserSvg";
import KeySvg from "../assets/KeySvg";
import RegisterGIF from "../assets/Register.gif";
import axios from "axios";
import { toast } from "react-toastify";
import { authContext } from "../context/authcontext";
import { Link, useNavigate } from "react-router-dom";
import { RegisterInputs } from "@harshbhange0/blogts-types";

export default function Register() {
  const { setAuth, auth } = useContext(authContext);
  useEffect(() => {}, []);
  const [loadingR, setLoading] = useState(false);
  const [user, setUser] = useState<RegisterInputs>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    const baseurl = import.meta.env.VITE_BASE_USER_URL;
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${baseurl}register`, {
        email: user.email,
        password: user.password,
        name: user.name,
      });
      if (!res) {
        return toast.error("Cannot Register User");
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.id);
      toast.success("Successful Register");
      if (res.data.success) {
        setLoading(false);
        navigate("/");
        location.reload();
        setAuth();
      }
    } catch (error) {
      console.log(error);
      return toast.error("Internal Server Error");
    }
  };

  return (
    <>
      <div className="md:w-[50%] h-full flex sm:flex-row items-center justify-center mx-auto  gap-10 py-[8rem] transition">
        <img className="h-[350px] hidden sm:block " src={RegisterGIF} alt="" />

        <form className="flex gap-5 flex-col " onSubmit={handleSubmit}>
          <h1 className="text-5xl font-bold pb-5 text-center">Register</h1>
          <label className="input input-bordered flex items-center gap-2">
            <MailSvg />
            <input
              type="text"
              required
              autoComplete="off"
              className="grow"
              placeholder="Email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <UserSvg />
            <input
              type="text"
              required
              autoComplete="off"
              className="grow"
              placeholder="Name"
              value={user.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <KeySvg />
            <input
              type="password"
              required
              autoComplete="off"
              className="grow"
              placeholder="********"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </label>
          <div className="w-full ">
            <button
              type="submit"
              disabled={loadingR ? true : false}
              className={`mx-auto w-full block btn btn-outline  ${
                loadingR ? "btn-neutral" : "btn-info"
              }`}
            >
              {loadingR ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : (
                "Register"
              )}
            </button>
          </div>
          <span className="text-center">
            Already have an account?
            <Link to="/login" className="text-blue-500 underline">
              {" "}
              Log in
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
