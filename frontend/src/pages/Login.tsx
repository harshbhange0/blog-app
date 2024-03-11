import { useContext, useState } from "react";
import MailSvg from "../assets/MailSvg";
import KeySvg from "../assets/KeySvg";
import LoginSvg from "../assets/Login.gif";
import LoadingIcon from "../components/LoadingIcon";
import { authContext } from "../context/authcontext";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LogInInputs } from "@harshbhange0/blogts-types";
import { setItemToLocalStorage } from "../utils/localstorage";

export default function Login() {
  const navigate = useNavigate();
  const [loadingR, setLoading] = useState(false);
  const [user, setUser] = useState<LogInInputs>({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: any) => {
    const baseurl = import.meta.env.VITE_BASE_USER_URL;
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${baseurl}login`, {
        email: user.email,
        password: user.password,
      });
      if (!res) {
        return toast.error("Cannot Register User");
      }

      setItemToLocalStorage("authorization", res.data.token);
      setItemToLocalStorage("id", res.data.id);
      toast.success("Successful Register");
      if (res.data.success) {
        setLoading(false);
        navigate("/");
        location.reload();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast.error("Internal Server Error");
    }
  };
  const { loading } = useContext(authContext);
  return loading ? (
    <LoadingIcon />
  ) : (
    <div className="mx-auto flex h-full items-center justify-center gap-10 py-[10rem]  transition sm:flex-row md:w-[50%]">
      <img className="hidden h-[350px] sm:block " src={LoginSvg} alt="" />

      <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
        <h1 className="pb-5 text-center text-5xl font-bold">Log in</h1>
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
            className={`btn btn-outline mx-auto block w-full  ${
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
          Don't have an account?
          <Link to="/register" className="text-blue-500 underline">
            {" "}
            Register
          </Link>
        </span>
      </form>
    </div>
  );
}
