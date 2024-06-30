import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import myHook from "./Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import CreateGroup from "./CreateGroup";
import BottomMenu from "./BottomMenu";
import img1 from "../images/groupChat.jpeg";
import { AiOutlineWechat } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import maleImg from "../assets/male.jpg"
import femaleImg from "../assets/female.png"
function Sidebar() {
  const [searchText, setSearchText] = useState("");
 const urlBackend = import.meta.env.VITE_BACKEND_API
  const {
    userDetails,
    setUserDetails,
    setToken,
    token,
    renderSidebar,
    setChatWithUserName,
    setChatWithIcon,
    hideSider,
    setHideSider,
    setConversation,
  } = myHook();
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filteredContacts2, setFilteredContacts2] = useState([]);

  const navigate = useNavigate();
  const fetchChats = async () => {
    console.log("start");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await axios.get(`${urlBackend}/chats`, config);
    setFilteredContacts(result.data.data);
    setFilteredContacts2(result.data.data);
    console.log("DTA SIDE", result.data.data);
  };
  const handleEachUser = (conversation) => {
    setConversation(conversation);
    setHideSider({
      isActive: false,
      comName: "Chats",
    });
    if (conversation.isGroupChat) {
      setChatWithUserName(conversation.chatName);
      navigate("chat/" + conversation._id + "&" + conversation.chatName);
    } else {
      let userName =
        conversation.users[0]._id === userDetails._id
          ? conversation.users[1].username
          : conversation.users[0].username;
      setChatWithUserName(userName);
      setChatWithIcon(
        conversation.users[0]._id === userDetails._id
          ? conversation.users[1].profilePic
          : conversation.users[0].profilePic
      );
      navigate("chat/" + conversation._id + "&" + userName);

      console.log("conversation", userName);
    }
  };
  const searchChats = (searchTerm) => {
    searchTerm = searchTerm.toLowerCase();

    const filteredChats = filteredContacts2.filter((chat) => {
      // Search by chatName and any user's username within the chat
      const chatNameMatch = chat.chatName.toLowerCase().includes(searchTerm);
      const userMatch = chat.users.some((user) =>
        user.username.toLowerCase().includes(searchTerm)
      );

      return chatNameMatch || userMatch;
    });

    setFilteredContacts(filteredChats);
  };
  const handleHideSider = () => {
    setHideSider({
      isActive: false,
      comName: hideSider.comName,
    });
  };
  const handleHideSider2 = (name) => {
    setHideSider({
      isActive: false,
      comName: name,
    });
  };
  useEffect(() => {
    fetchChats();
  }, [renderSidebar]);
  function convertToSimpleDate(isoDateString) {
    const dateObject = new Date(isoDateString);
    const now = new Date();
    
    // Get current date without time
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Get yesterday's date without time
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    // Get the date part of the dateObject
    const dateOnly = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
    
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
  
    const hours = dateObject.getHours();
    const minutes = String(dateObject.getMinutes()).padStart(2, "0");
    const amPm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
  
    if (dateOnly.getTime() === today.getTime()) {
      // If the date is today
      return `${formattedHours}:${minutes} ${amPm}`;
    } else if (dateOnly.getTime() === yesterday.getTime()) {
      // If the date is yesterday
      return 'yesterday';
    } else {
      // For any other date
      return `${day}-${month}-${year} ${formattedHours}:${minutes} ${amPm}`;
    }
  }
  return (
    <div
      className={`${
        hideSider.isActive === true && hideSider.comName === "Sidebar" ? "" : "max-md:hidden"
      } w-[350px] max-md:w-[100%] h-screen flex flex-col bg-gradient-to-bl from-slate-950  via-slate-900 to-blue-950 to-90% border-r border-cyan-950 overflow-y-auto `}
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#38b2ac #2c2f33", // Teal scrollbar thumb and track
      }}
    >
      <style>
        {`
  /* Chrome, Edge, and Safari */
  .overflow-y-auto::-webkit-scrollbar {
    width: 8px;  // Scrollbar width
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: #2c2f33;  // Scrollbar track color
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: #38b2ac;  // Teal color for the scrollbar thumb
    border-radius: 10px;
    border: 2px solid #2c2f33;  // Optional: adds some spacing between the track and thumb
  }
`}
      </style>
      <div className="flex justify-between p-2">
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
            handleHideSider2("Profile");
          }}
        />
      </div>
      </div>
      <div className="p-4 flex justify-between items-center gap-2 ">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full px-3 py-1 rounded-3xl bg-blue-950 bg-opacity-50 text-white outline-none focus:outline-none"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            searchChats(e.target.value);
          }}
        />
        {/* <button className=" rounded-full bg-black text-teal-500" onClick={()=>searchChats(searchText)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button> */}
        
      </div>
      <div className="flex-1 overflow-y-auto h-screen">
        {/* Render filtered contacts */}
        {filteredContacts?.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center p-4 cursor-pointer bg-gradient-to-bl from-slate-950  via-slate-900 to-blue-950 to-90%"
            onClick={() => {
              handleEachUser(contact);
            }}
          >
            {contact.isGroupChat ? (
              <>
                <img
                  alt="text"
                  src={img1}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex flex-col w-[100%]">
                  <span className="text-white">{contact.chatName}</span>
                  <div className=" text-[10px] text-gray-400 flex justify-between w-[100%] ">
                    <span>
                      {contact?.latestMessage?.sender?._id === userDetails._id
                        ? "you: " + contact?.latestMessage?.content
                        : contact?.latestMessage?.sender?.username +
                          ": " +
                          contact?.latestMessage?.content}
                    </span>
                    <span>
                      {contact?.latestMessage &&
                        contact?.updatedAt &&
                        convertToSimpleDate(contact?.updatedAt)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <img
                  src={
                    contact.users[0]._id === userDetails._id
                      ? contact.users[1].profilePic !== "" ? contact.users[1].profilePic : contact.users[1].gender === "Male" ? maleImg : femaleImg
                      :contact.users[0].profilePic !== "" ? contact.users[0].profilePic : contact.users[0].gender === "Male" ? maleImg : femaleImg
                  }
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex flex-col w-[100%]">
                  <span className="text-white">
                    {contact.users[0]._id === userDetails._id
                      ? contact.users[1].username
                      : contact.users[0].username}
                  </span>
                  <div className=" text-[10px] text-gray-400 flex justify-between w-[100%] ">
                    <span>{contact?.latestMessage?.content}</span>
                    <span>
                      {contact?.latestMessage &&
                        contact?.updatedAt &&
                        convertToSimpleDate(contact?.updatedAt)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
        {filteredContacts?.length == 0 && (
          <div className="text-white text-center">No Users Found</div>
        )}
      </div>
      <BottomMenu />
    </div>
  );
}

export default Sidebar;
