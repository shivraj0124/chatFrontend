import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

import myHook from "./Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import BottomMenu from "./BottomMenu";
import { AiOutlineWechat } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
function CreateGroup() {
  const [modalCreateGroup, setModalCreateGroup] = useState(false);
  const {
    userDetails,
    setUserDetails,
    setToken,
    token,
    renderSidebar,
    setRenderSidebar,
  } = myHook();
  const urlBackend = import.meta.env.VITE_BACKEND_API
  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  const handleCreateGroup = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${urlBackend}/chats/createGroup`,
      {
        name: groupName,
        users: '["6651caeae38ad67004effb2b","6651cdded52d750cc885d84e"]',
      },
      config
    );
    if (response.data.success) {
      toast.success("Group Created Successfully.");
      navigate("/chats/groups");
      setRenderSidebar(!renderSidebar);
    } else {
      toast.error("Something went wrong, Try again later.");
    }
  };
  const handleHideSider2 = (name) => {
    setHideSider({
      isActive: false,
      comName: name,
    });
  };
  return (
    <div className="w-full h-screen bg-gradient-to-bl from-slate-950  via-slate-900 to-blue-950 to-90%  flex flex-col">
      <div className="flex justify-between p-2 md:hidden">
        <div className="text-blue-500 flex items-center ">
          <AiOutlineWechat size={24} />
          <span className="text-white text-sm font-semibold">ChatEase</span>
        </div>
        
      </div>
      <div className="w-full h-[90vh] flex justify-center items-center px-2">
        <div className="p-5 shadow-xl bg-gradient-to-tr from-slate-950  via-slate-900 to-blue-950 to-90% rounded-md text-white">
          <div className="w-full flex justify-end">
            <MdOutlineCancel
              size={24}
              onClick={() => navigate("/chats/groups")}
              className="hover:cursor-pointer"
            />
          </div>
          <label className=" ">Group Name</label>
          <input
            type="text"
            className=" mt-2 border bg-transparent w-[100%] rounded-md px-3  py-[7px] focus:outline-none border-blue-600"
            placeholder="Enter your Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)} // Update the userName state
          />
          <button
            onClick={handleCreateGroup}
            className=" bg-blue-600 rounded-lg font-semibold bg-opacity-25 px-3 py-2 mt-5 text-blue-600 w-max "
          >
            Create Group
          </button>
        </div>
      </div>
      <div className="md:hidden">
      <BottomMenu />
      </div>
    </div>
  );
}

export default CreateGroup;
