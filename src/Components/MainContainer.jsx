import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import myHook from "./Context";
import { useNavigate } from "react-router-dom";
function MainContainer() {
  const navigate = useNavigate()
  const { setHideSider, hideSider, setUserDetails, setToken, userDetails } =
    myHook();
  const location = useLocation();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    const storedToken = localStorage.getItem("token");
    setUserDetails(storedUserDetails ? JSON.parse(storedUserDetails) : null);
    setToken(storedToken ? storedToken : null);

    if (userDetails === null) {
      navigate("/login");
    } else {
      if (location.pathname === "/chats/groups") {
        setHideSider({
          isActive: false,
          comName: "Groups",
        });
      }
      if (location.pathname === "/chats") {
        setHideSider({
          isActive: true,
          comName: "Sidebar",
        });
      }
      if (location.pathname === "/chats/profile") {
        setHideSider({
          isActive: false,
          comName: "Profile",
        });
      }
      if (location.pathname === "/chats/users") {
        console.log("hello users");
        setHideSider({
          isActive: false,
          comName: "Users",
        });
      }
      if (location.pathname === "/chats/createGroup") {
        console.log("hello users");
        setHideSider({
          isActive: false,
          comName: "createGroup",
        });
      }
      const text = location.pathname;
      const regex = /\/chats\/chat/;

      const isMatch = regex.test(text);
      if (isMatch) {
        setHideSider({
          isActive: false,
          comName: "Chats",
        });
      }
    }
    console.log("state", hideSider);
  }, []);
  return (
    <div
      className="flex flex-row bg-gradient-to-bl from-slate-950  via-slate-900 to-blue-950 to-90%"
      
    >
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default MainContainer;
