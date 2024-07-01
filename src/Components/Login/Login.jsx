import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import photo from "../../assets/login.png";
import axios from "axios";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import myHook from "../Context";
import { AiOutlineWechat } from "react-icons/ai";
function Login() {
  const urlBackend = import.meta.env.VITE_BACKEND_API
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setUserDetails } = myHook();
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (userName.trim() === "") {
        toast.error("Please enter your Username");
      } else if (password.length < 6) {
        toast.error("Please enter password of atleast 6 characters ");
      } else {
        const data = {
          username: userName,
          password: password,
        };
        const response = await axios.post(`${urlBackend}/user/login`,
          data
        );
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response.data.user)
          );
          setUserDetails(response.data.user);
          toast.success("Login Successful");
          navigate("/chats/profile")
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" w-[100%] h-screen max-h-screen bg-gradient-to-bl from-slate-950  via-slate-900 to-blue-950 to-90% ">
       <div className="text-blue-500 flex items-center px-2 pt-2 w-[100%] ">
        <AiOutlineWechat size={24} />
        <span className="text-white text-sm font-semibold">ChatEase</span>
      </div>
      <div className="flex flex-col w-[100%] h-[90vh] md:flex-row justify-center items-center ">
      <div className="md:w-[50%] w-[100%] flex justify-center items-center max-md:hidden max-md:h-screen ">
        <img src={photo} alt="Login" />
      </div>
      <div className="md:w-[50%] w-[100%] max-md:h-screen flex flex-col gap-5 justify-center items-start px-2 ">
        <div className="md:w-[80%] w-[100%]">
          <h1 className=" font-semibold text-white text-xl underline underline-offset-4 text-center">
            Sign In
            <br />
          </h1>
          <form onSubmit={handleSubmit} className=" w-full flex flex-col gap-3 text-white">
            <label className=" ">Username</label>
            <input
              type="text"
              className=" border bg-transparent w-[100%] rounded-md px-3  py-[7px] focus:outline-none"
              placeholder="Enter your userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)} // Update the userName state
            />
            <label className="">Password</label>
            <input
              type="password"
              className=" border bg-transparent w-[100%] rounded-md px-3  py-[7px] focus:outline-none"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update the password state
            />
            <section className="flex w-full flex-col justify-center items-center mt-2">
              <button className=" bg-gradient-to-tr from-slate-950 to-blue-700 to-90% hover:to-100%  text-white rounded-lg font-semibold  px-3 py-2  w-[100%] ">
                login
              </button>
              <div className="mt-2">
                <Link to={"/auth/signUp"} className=" mt-3 cursor-pointer hover:underline underline-offset-2 decoration-1">
                <span className="text-white">Don't have an account ? </span>
                  {" "}
                  <span className="cursor-pointer text-blue-500" >
                    signup
                  </span>
                </Link>
              </div>
            </section>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Login;
