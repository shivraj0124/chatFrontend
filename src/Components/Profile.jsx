import React, { useEffect, useState } from "react";
import myHook from "./Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { HiMiniBars3 } from "react-icons/hi2";
import BottomMenu from "./BottomMenu";
import { AiOutlineWechat } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import maleImg from "../assets/male.jpg"
import femaleImg from "../assets/female.png"
function Profile() {
    const navigate = useNavigate()
  const {
    userDetails,
    setUserDetails,
    setToken,
    token,
    renderSidebar,
    setRenderSidebar,
    hideSider,
    setHideSider,
  } = myHook();
  const handleHideSider = () => {
    setHideSider({
      isActive: true,
      comName: "Profile",
    });
  };
  function convertToSimpleDate(isoDateString) {
    const dateObject = new Date(isoDateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(dateObject.getDate()).padStart(2, "0");

    const hours = dateObject.getHours();
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const amPm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    return `${day}-${month}-${year} ${formattedHours}:${minutes} ${amPm}`;
  }
  useEffect(()=>{
    console.log("hleoefof");
    const storedUserDetails = localStorage.getItem("userDetails");
    const storedToken = localStorage.getItem("token");
    setUserDetails(storedUserDetails ? JSON.parse(storedUserDetails) : null);
    setToken(storedToken ? storedToken : null);
    console.log("user",userDetails);
    if (userDetails === null) {
      navigate("/auth/login");
    }
  },[])
  return ( 
      <div
        className={`${
          hideSider.isActive === false && hideSider.comName === "Profile"
            ? ""
            : "max-md:hidden"
        } flex flex-col w-[100%] h-screen bg-gradient-to-bl from-slate-950  via-slate-900 to-blue-950 to-90%`}
        
      >
        <div className="flex justify-between p-2 md:hidden ">
        <div className="text-blue-500 flex items-center ">
          <AiOutlineWechat size={24} />
          <span className="text-white text-sm font-semibold">ChatEase</span>
        </div>
       
      </div>

        <div className="flex flex-col h-full w-full">
          <div className="max-md:hidden w-[100%] text-white p-2 flex justify-between items-center border-b border-cyan-950">
            <div className="">Profile</div>
          </div>
          
          <div className="flex justify-center items-center overflow-y-auto md:h-[100%] h-[80%] w-[100%] max-md:mt-5">
            {/* Render filtered contacts */}
            <div className="flex flex-col justify-center items-center p-4 bg-gradient-to-tr from-slate-950  via-slate-900 to-blue-950 to-90% rounded-md">
              <div className="border-b border-gray-600 w-[100%] flex flex-col justify-center items-center pb-1">
                <img
                  src={userDetails?.profilePic !== ""  ? userDetails.profilePic : userDetails.gender === "Male" ? maleImg : femaleImg}
                  className="w-[100px] h-[100px] max-md:h-[60px] max-md:w-[60px] rounded-[50%]"
                />
                <span className=" text-sm text-center text-white">
                  {userDetails?.username}
                </span>
              </div>
              <div className="text-gray-200  flex flex-col text-sm mt-5">
                <span>
                  Email:{" "}
                  <span className="font-semibold text-gray-500">
                    {userDetails?.email}
                  </span>
                </span>
                <span>
                  Gender:{" "}
                  <span className="font-semibold text-gray-500">
                    {userDetails?.gender}
                  </span>
                </span>
                <span>
                  Profile Created on:{" "}
                  <span className="font-semibold text-gray-500">
                    {convertToSimpleDate(userDetails?.createdAt)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          {" "}
          <BottomMenu />
        </div>
      </div>
  );
}

export default Profile;
