import React, { useEffect, useState } from "react";
import myHook from "./Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { HiMiniBars3 } from "react-icons/hi2";
import BottomMenu from "./BottomMenu";
import { AiOutlineWechat } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import maleImg from "../assets/male.jpg";
import femaleImg from "../assets/female.png";
function Users() {
  const [searchText, setSearchText] = useState("");
  const urlBackend = import.meta.env.VITE_BACKEND_API
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
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filteredContacts2, setFilteredContacts2] = useState([]);
  const navigate = useNavigate();
  const fetchAllUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("Hello", config);
      const result = await axios.get(`${urlBackend}/user/fetchAllUsers`,
        config
      );
      console.log(result, "data");
      setFilteredContacts(result.data.allUsers);
      setFilteredContacts2(result.data.allUsers);
    } catch (err) {
      toast.error(err);
    }
  };
  const handleContactClick = async (contact) => {
    // setSelectedContact(contact);
    console.log("selected COntact", contact);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("Hello", config);
      const result = await axios.post(`${urlBackend}/chats`,
        {
          userId: contact._id,
        },
        config
      );
      console.log(result, "data");
      setRenderSidebar(!renderSidebar);
      handleHideSider();
    } catch (err) {
      toast.error(err);
    }
  };
  const searchChats = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase();

    const filteredChats = filteredContacts2.filter((chat) => {
      const userMatch = chat.username.toLowerCase().includes(searchTerm);

      return userMatch;
    });

    setFilteredContacts(filteredChats);
  };
  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    const storedToken = localStorage.getItem("token");
    setUserDetails(storedUserDetails ? JSON.parse(storedUserDetails) : null);
    setToken(storedToken ? storedToken : null);
    console.log("Token", token);

    if (userDetails === null) {
      navigate("/login");
    }
    fetchAllUsers();
  }, []);
  const handleHideSider = () => {
    setHideSider({
      isActive: true,
      comName: "Sidebar",
    });
    navigate("/chats")
  };
  const handleHideSider2 = () => {
    setHideSider({
      isActive: false,
      comName: "Profile",
    });
  };
  return (
    <div
      className={`${
        hideSider.isActive === false && hideSider.comName === "Users"
          ? ""
          : "max-md:hidden"
      } flex flex-col w-full h-screen bg-gradient-to-bl from-slate-950  via-slate-900 to-blue-950 to-90%`}
    >
      <div className="flex justify-between p-2 md:hidden">
        <div className="text-blue-500 flex items-center ">
          <AiOutlineWechat size={24} />
          <span className="text-white text-sm font-semibold">ChatEase</span>
        </div>
        <div className="   ">
          {" "}
          <HiOutlineUserCircle
            className="cursor-pointer text-white"
            size={24}
            onClick={() => {
              navigate("/chats/profile");
              handleHideSider2();
            }}
          />
        </div>
      </div>
      <div className="flex flex-col h-full">
        <div className=" w-[100%] text-white p-2 flex justify-between items-center ">
          <div className="md:p-2 flex justify-between items-center gap-2 w-full">
          <div className="h-8 px-3 py-1 text-sm bg-blue-950 bg-opacity-50 w-max rounded-3xl text-blue-500">
              Users
            </div>
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-[50%] max-md:w-[100%] h-8 px-3 py-1 rounded-3xl bg-blue-950 bg-opacity-50 text-white outline-none focus:outline-none"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                searchChats(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-col overflow-y-auto h-[80vh] py-1 pb-10">
          {/* Render filtered contacts */}
          {filteredContacts?.map((contact,index) => (
            <div
              key={index}
              className="flex items-center p-4 cursor-pointer hover:bg-gradient-to-bl hover:from-slate-950  hover:via-slate-900 hover:to-blue-950 to-90%"
              onClick={() => handleContactClick(contact)}
            >
              <img
                src={contact?.profilePic !== "" ? contact.profilePic: contact.gender === "Male" ? maleImg : femaleImg}
                alt={contact?.username}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-white">{contact.username}</span>
              {/* {onlineStatus[contact.id] ? (
                <span className="ml-2 text-sm text-green-400">Online</span>
              ) : (
                <span className="ml-2 text-sm text-red-400">Offline</span>
              )} */}
            </div>
          ))}
         
          {filteredContacts?.length == 0 && (
            <div className="text-white text-center flex justify-center items-center mt-5">
              No Users Found
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden">
        {" "}
        <BottomMenu />
      </div>
    </div>
  );
}

export default Users;
