// src/pages/Home.js

import React from "react";
import { AiOutlineWechat } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import myHook from "./Context";
const Home = () => {
  const { userDetails } = myHook();
  const navigate = useNavigate();
  const handleRedirect = () => {
    if (userDetails === null) {
      navigate("/auth/login");
    } else navigate("/chats/profile");
  };
  return (
    <div className="flex flex-col w-full h-screen bg-gradient-to-bl from-slate-950 via-slate-900 to-blue-950">
      <div className="flex justify-between p-2">
        <div className="text-blue-500 flex items-center">
          <AiOutlineWechat size={24} />
          <span className="text-white text-sm font-semibold ">
            ChatEase
          </span>
        </div>
        {userDetails !== null &&
          <div>
            <HiOutlineUserCircle
              className="cursor-pointer text-white"
              size={24}
              onClick={() => {
                navigate("/chats/profile");
              }}
            />
          </div>
        }
        {
          !userDetails && 
          <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm flex " onClick={()=>navigate("/auth/login")}>
            Login
          </button>
        }
      </div>
      <div className="flex flex-col justify-center items-center h-[50vh] md:mt-20">
        <div className="w-full h-4/5 flex justify-center items-center text-center break-words font-bold bg-gradient-to-r from-blue-600 via-cyan-200 to-blue-700 bg-clip-text text-transparent text-2xl">
          <Typewriter
            words={["ChatEase: Effortless Conversations, Anytime, Anywhere."]}
            typeSpeed={50}
            loop
            cursor={true}
          />
        </div>
        <div className="flex items-center justify-center ">
          <button
            className="bg-blue-600 bg-opacity-40 hover:bg-opacity-25 text-white rounded-lg font-semibold  px-3 py-2  w-max "
            onClick={handleRedirect}
          >
            Let's Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
