import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signUpImage from "../../assets/signUp.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineWechat } from "react-icons/ai";
function SignUp() {
  const urlBackend = import.meta.env.VITE_BACKEND_API
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, selectGender] = useState("");
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();
  const validateFullName = (name) => /^[a-zA-Z\s]*$/.test(name);
  const validatePassword = (pass) => pass.length >= 8;
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(userName, password, email);
    try {
      if (userName.trim() === "") {
        toast.error("Please enter your name");
      } else if (email.trim() === "") {
        toast.error("Please enter your email");
      } else if (password.length < 6) {
        toast.error("Please enter password of atleast 6 characters ");
      } else if (gender.trim === "") {
        toast.error("Please enter your Gender");
      } else {
        const data = {
          username: userName,
          email: email,
          password: password,
          gender: gender,
        };
        const response = await axios.post(`${urlBackend}/user/register`,
          data
        );
        if (response.data.success) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response.data.user)
          );
          toast.success("User Registered Successfully");
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className=" w-[100%] h-screen max-h-screen bg-gradient-to-bl from-slate-950  via-slate-900 to-blue-950 to-90%">
      <div className="text-blue-500 flex items-center px-2 pt-2 w-[100%] ">
        <AiOutlineWechat size={24} />
        <span className="text-white text-sm font-semibold">ChatEase</span>
      </div>
      <div className="flex flex-col w-[100%] h-[90vh] md:flex-row justify-center items-center ">
        <div className="md:w-[50%] w-[100%] flex justify-center items-center max-md:hidden">
          <img src={signUpImage} alt="Login" />
        </div>
        <div className="md:w-[55%] w-[100%] flex flex-col justify-center items-start p-2">
          <div className="md:w-[80%] w-[100%]">
            <h1 className="font-semibold text-white text-xl underline underline-offset-4 text-center">
              Create An Account
            </h1>
            <form
              className="flex flex-col mt-5 w-full text-white"
              onSubmit={handleOnSubmit}
            >
              <div className="flex flex-col">
                <label className="mt-5">Username</label>
                <input
                  type="text"
                  className="border bg-transparent w-[100%] rounded-md px-3  py-[7px] focus:outline-none"
                  placeholder="Enter Your Username"
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-5">Email</label>
                <input
                  type="email"
                  className="border bg-transparent w-[100%] rounded-md px-3  py-[7px] focus:outline-none"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mt-5">Gender</label>
                <select
                  className="border bg-transparent w-[100%] rounded-md px-3  py-[7px] focus:outline-none focus:bg-blue-950"
                  onChange={(e) => selectGender(e.target.value)}
                  value={gender}
                  required
                >
                  <option value={""}>Select Gender</option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
              </div>
              <div className="flex flex-col relative">
                <label className="mt-5">Password</label>
                <input
                  type={eye ? "text" : "password"}
                  className="border bg-transparent  rounded-md px-2 py-1 focus:outline-none "
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute top-7 right-0 mt-6 mr-4 cursor-pointer">
                  {!eye ? (
                    <FaEye size={20} onClick={() => setEye(true)} />
                  ) : (
                    <FaEyeSlash size={20} onClick={() => setEye(false)} />
                  )}
                </div>
              </div>

              <button
                variant="contained"
                type="submit"
                className="bg-gradient-to-tr from-slate-950 to-blue-700 to-90% hover:to-100%  text-white rounded-lg font-semibold hover:bg-opacity-60 px-3 py-2 w-[100%] mt-5"
              >
                Submit
              </button>
              <div>
              <Link className="cursor-pointer hover:underline underline-offset-2 decoration-1 text-center" to="/auth/Login ">
                <h2 className="text-center mt-5">
                  Already have an account ?{" "}
                  <span className="cursor-pointer text-blue-500" >
                    login
                  </span>
                </h2>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
