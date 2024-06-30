import React, { useEffect, useState } from "react";
import myHook from "./Context";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { HiMiniBars3 } from "react-icons/hi2";
import BottomMenu from "./BottomMenu";
import img1 from "../images/groupChat.jpeg";
import { AiOutlineWechat } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
function Groups() {
  const location = useLocation();
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
  const [selectedContact, setSelectedContact] = useState();
  const navigate = useNavigate();
  const fetchAllUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("Hello", config);
      const result = await axios.get(`${urlBackend}/chats/fetchGroups`,
        config
      );
      console.log(result, "data");
      setFilteredContacts(result?.data?.data);
      setFilteredContacts2(result?.data?.data);
    } catch (err) {
      toast.error(err);
    }
  };
  const handleContactClick = async (contact) => {
    setSelectedContact(contact);
    console.log("selected COntact", contact);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("Hello", config);
      const result = await axios.put(`${urlBackend}/chats/addSelfToGroup`,
        {
          chatId: contact._id,
          userId: userDetails._id,
        },
        config
      );
      console.log(result, "added to group");

      setRenderSidebar(!renderSidebar);
      handleHideSider();
    } catch (err) {
      toast.error(err);
    }
  };
  const searchChats = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase();

    const filteredChats = filteredContacts2?.filter((chat) => {
      const chatMatch = chat.chatName.toLowerCase().includes(searchTerm);

      return chatMatch;
    });

    setFilteredContacts(filteredChats);
  };

  useEffect(() => {
    if (location.pathname === "/chats/groups") {
      console.log("hello groups");
      setHideSider({
        isActive: false,
        comName: "Groups",
      });
    }
    console.log("state", hideSider);
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
        hideSider.isActive === false && hideSider.comName === "Groups"
          ? "max-md:block"
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
      <div className="flex flex-col ">
        <div className=" w-[100%] text-white p-2 flex justify-between items-center ">
          <div className="md:p-2 flex justify-between items-center gap-2 w-full ">
            <div className="h-8 px-3 py-1 text-sm bg-blue-950 bg-opacity-50 w-max rounded-3xl text-blue-500">
              Groups
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
          {filteredContacts?.map((contact) => (
            <div
              key={contact._id}
              className="flex items-center p-4 cursor-pointer  hover:bg-gradient-to-bl hover:from-slate-950  hover:via-slate-900 hover:to-blue-950 to-90%"
              onClick={() => handleContactClick(contact)}
            >
              <img alt="he" src={img1} className="w-8 h-8 rounded-full mr-2" />
              <span className="text-white">{contact.chatName}</span>
            </div>
          ))}

         
          {filteredContacts?.length == 0 && (
            <div className="text-white text-center mt-5">No Groups Found</div>
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

export default Groups;
