import React, { useState, useEffect, useRef } from "react";
import myHook from "./Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoMdSend } from "react-icons/io";
import { HiMiniBars3 } from "react-icons/hi2";
import io from "socket.io-client";
const ENDPOINT = import.meta.env.VITE_BACKEND_API;
var socket, selectedChatCompare;
import img1 from "../images/groupChat.jpeg";
import maleImg from "../assets/male.jpg";
import femaleImg from "../assets/female.png";
import { IoChevronBackSharp } from "react-icons/io5";
function Chats() {
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const [inputText, setInputText] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const urlBackend = import.meta.env.VITE_BACKEND_API;
  console.log("ENDPOINT", ENDPOINT);
  const {
    chatWithIcon,
    chatWithUserName,
    token,
    userDetails,
    hideSider,
    setHideSider,
    conversation,
  } = myHook();
  const [socketConnected, setSocketConnected] = useState(false);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams.id.split("&");
  const [chatWith, setChatWith] = useState({});
  const [loading, setLoading] = useState(true);
  const [chatInfo, setChatInfo] = useState();
  useEffect(() => {
    if (!socketConnected) {
      socket = io(ENDPOINT,{
        transports: ['websocket', 'polling'],
      });
      socket.emit("setup", userDetails);
      socket.on("connection");
      setSocketConnected(true)
    }

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

   
  }, [chat_id]);
  const fetchAllChats = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        `${urlBackend}/message/${chat_id}`,
        config
      );
      setAllMessages(response.data.data);
      socket.emit("join chat", chat_id);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch messages");
    }
  };
  const fetchUserDetails = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      userName: chat_user,
    };
    try {
      const response = await axios.post(
        `${urlBackend}/user/fetchUserByUserName`,
        data,
        config
      );
      if (response.data.success) {
        const chatWithData = response.data.data;

        setChatWith({
          profilePic: chatWithData.profilePic,
          email: chatWithData.email,
          username: chatWithData.username,
          gender: chatWithData.gender,
        });
      }
      console.log("user", response);
    } catch (error) {
      toast.error("Failed to fetch messages");
    }
  };
  const fetchChatInfo = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      chatId: chat_id,
    };
    try {
      const response = await axios.post(
        `${urlBackend}/chats/fetchChatDetails`,
        data,
        config
      );
      if (response.data.success) {
        const chatWithData = response.data.data;
        console.log("chat with Data", chatWithData);
        setChatInfo(chatWithData);
      }
    } catch (error) {
      toast.error("Failed to fetch messages");
    }
  };
  useEffect(() => {
    fetchAllChats();
    fetchUserDetails();
    fetchChatInfo();
    selectedChatCompare = chat_id;
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat_id]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log("receive", newMessageReceived);
      if (
        !selectedChatCompare ||
        selectedChatCompare !== newMessageReceived.chat._id
      ) {
        console.log("new");
      } else {
        console.log("hello new", newMessageReceived);
        setAllMessages([...allMessages, newMessageReceived]);
      }
    });
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  });

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (inputText.trim().length === 0) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `${urlBackend}/message`,
        {
          content: inputText,
          chatId: chat_id,
        },
        config
      );

      setAllMessages((prevMessages) => [...prevMessages, response.data.data]);
      socket.emit("new message", response.data.data);
      setInputText("");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  function convertToSimpleDate(isoDateString) {
    const dateObject = new Date(isoDateString);
    const now = new Date();

    // Get current date without time
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Get yesterday's date without time
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Get the date part of the dateObject
    const dateOnly = new Date(
      dateObject.getFullYear(),
      dateObject.getMonth(),
      dateObject.getDate()
    );

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
      return "yesterday";
    } else {
      // For any other date
      return `${day}-${month}-${year} ${formattedHours}:${minutes} ${amPm}`;
    }
  }

  const handleHideSider = () => {
    navigate("/chats");
    setHideSider({
      isActive: true,
      comName: "Sidebar",
    });
  };
  return (
    <div
      className={`${
        hideSider.isActive === false && hideSider.comName === "Chats"
          ? ""
          : "max-md:hidden"
      } flex flex-col w-full h-screen`}
    >
      <div className="flex flex-col max">
        <div className=" text-white p-2 flex gap-2 items-center border-b ">
          <div className="md:hidden">
            <IoChevronBackSharp onClick={handleHideSider} size={24} />
          </div>
          <div className="flex">
            {chatInfo?.isGroupChat ? (
              <img
                alt="text"
                src={img1}
                className="w-8 h-8 rounded-full mr-2"
              />
            ) : (
              <img
                src={chatWith?.profilePic !== ""  ? chatWith?.profilePic : chatWith?.gender === "Male" ? maleImg : femaleImg}
                className="w-10 h-10 rounded-full mr-4"
                alt=""
              />
            )}
            <span className="text-xl text-white">
              {chat_user ? chat_user : chatWithUserName}
            </span>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col gap-2 h-[100vh] overflow-y-auto scroll-auto p-4 "
        ref={chatContainerRef}
      >
        {!loading &&
          allMessages?.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.sender._id === userDetails._id
                  ? "justify-end "
                  : "justify-start"
              }`}
            >
              <div
                className={`rounded-2xl  px-3 flex flex-col md:max-w-[500px] max-md:max-w-[90%] py-1 break-words ${
                  message.sender._id === userDetails._id
                    ? " bg-gradient-to-t from-blue-600 to-blue-900  text-white rounded-br-[0px]"
                    : "bg-blue-500 bg-opacity-25 text-white rounded-bl-[0px]"
                }`}
              >
                <span className="font-semibold text-sm p-0">
                  {message.sender._id !== userDetails._id
                    ? message.sender.username
                    : ""}
                </span>
                <span className="break-words">{message.content}</span>
                <span
                  className={`  text-[10px] font-semibold  flex ${
                    message.sender._id === userDetails._id
                      ? "justify-end text-gray-900 text-opacity-60"
                      : "justify-start text-gray-500"
                  } w-full`}
                >
                  {convertToSimpleDate(message.createdAt)}
                </span>
              </div>
            </div>
          ))}
        {!loading && allMessages?.length === 0 && (
          <div className="text-white flex justify-center items-center">
            Let's start chat
          </div>
        )}
      </div>
      <div>
        <form
          onSubmit={handleSendMessage}
          className="flex items-center px-2 py-2"
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-4 py-2 rounded-3xl bg-blue-950 shadow-xl text-white focus:outline-none"
          />
          <button
            type="submit"
            className="ml-2 px-2 py-2 rounded-[50%] bg-blue-950 shadow-xl flex items-center text-blue-700"
          >
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transform rotate-45 text-teal-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg> */}
            <IoMdSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chats;
