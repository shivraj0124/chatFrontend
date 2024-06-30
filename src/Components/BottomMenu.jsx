import React from "react";
import { MdPersonAddAlt } from "react-icons/md";
import { MdOutlineGroupAdd } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiChatSmile3Line } from "react-icons/ri";

import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import myHook from "./Context";

function BottomMenu() {
  const location = useLocation();
  const { setHideSider, userDetails, setUserDetails } = myHook();
  const navigate = useNavigate();
  const handleHideSider2 = (name) => {
    setHideSider({
      isActive: false,
      comName: name,
    });
  };
  const handleHideSider = (name) => {
    setHideSider({
      isActive: true,
      comName: name,
    });
  };
  const handleLogOut = async () => {
    setUserDetails(null);
    localStorage.removeItem("userDetails");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="flex justify-between items-center bg-blue-950 py-1 gap-2 text-gray-200 max-md:fixed bottom-0 max-md:w-[100%] px-2 max-md:justify-center max-md:gap-4">
      <div className="flex flex-col justify-center items-center md:hidden w-max ">
        {" "}
        <div
          className={`${
            location.pathname === "/chats"
              ? "bg-gradient-to-b from-slate-950 to-blue-950  rounded-md"
              : ""
          } hover:bg-gradient-to-b from-slate-950 to-blue-950  rounded-md cursor-pointer w-[40px] py-1 flex justify-center items-center `}
        >
          <RiChatSmile3Line
            className=""
            size={20}
            onClick={() => {
              navigate("/chats");
              handleHideSider("Sidebar");
            }}
          />
        </div>
        <span
          className={`${
            location.pathname === "/chats" ? "font-semibold" : ""
          } cursor-pointer text-[10px] `}
        >
          Chats
        </span>
      </div>
      <div className="flex flex-col justify-center items-center   ">
        <div
          className={`${
            location.pathname === "/chats/users"
              ? "bg-gradient-to-b from-slate-950 to-blue-950  rounded-md"
              : ""
          } hover:bg-gradient-to-b from-slate-950 to-blue-950  rounded-md cursor-pointer w-[40px] py-1 flex justify-center items-center `}
        >
          <MdPersonAddAlt
            className="cursor-pointer"
            size={20}
            onClick={() => {
              navigate("/chats/users");
              handleHideSider2("Users");
            }}
          />
        </div>
        <span
          className={`${
            location.pathname === "/chats/users" ? "font-semibold" : ""
          } cursor-pointer text-[10px] `}
        >
          Users
        </span>
      </div>
      <div className={`flex flex-col justify-center items-center  w-max`}>
        {" "}
        <div
          className={`${
            location.pathname === "/chats/groups"
              ? "bg-gradient-to-b from-slate-950 to-blue-950  rounded-md"
              : ""
          } hover:bg-gradient-to-b from-slate-950 to-blue-950  rounded-md cursor-pointer w-[40px] py-1 flex justify-center items-center `}
        >
          <MdOutlineGroupAdd
            size={20}
            onClick={() => {
              navigate("/chats/groups");
              handleHideSider2("Groups");
            }}
          />
        </div>
        <span
          className={`${
            location.pathname === "/chats/groups" ? "font-semibold" : ""
          } cursor-pointer text-[10px] `}
        >
          Groups
        </span>
      </div>
      <div className="flex flex-col justify-center items-center   ">
        <div
          className={`${
            location.pathname === "/chats/createGroup"
              ? "bg-gradient-to-b from-slate-950 to-blue-950  rounded-md"
              : ""
          } hover:bg-gradient-to-b from-slate-950 to-blue-950  rounded-md cursor-pointer w-[40px] py-1 flex justify-center items-center `}
        >
          <IoAddCircleOutline
            className="cursor-pointer"
            size={20}
            onClick={() => {
              navigate("/chats/createGroup");
              handleHideSider2("createGroup");
            }}
          />
        </div>
        <span
          className={`${
            location.pathname === "/chats/createGroup" ? "font-semibold" : ""
          } cursor-pointer text-[10px] `}
        >
          Create Group
        </span>
      </div>
      <div
        className="flex flex-col justify-center items-center   "
        onClick={handleLogOut}
      >
        <div
          className={` hover:bg-gradient-to-b from-slate-950 to-blue-950  rounded-md cursor-pointer w-[40px] py-1 flex justify-center items-center `}
        >
          <IoLogOutOutline className="cursor-pointer" size={20} />
        </div>
        <span className="text-[10px]">Logout</span>
      </div>
    </div>
  );
}

export default BottomMenu;
