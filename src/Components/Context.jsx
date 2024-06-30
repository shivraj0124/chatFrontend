import React, { createContext, useContext, useEffect, useState } from "react";
const Context = createContext();

export const ContextProvider = ({ children }) => {

  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [renderSidebar, setRenderSidebar] = useState(false);
  const [chatWithIcon, setChatWithIcon] = useState();
  const [chatWithUserName, setChatWithUserName] = useState();
  const [conversation,setConversation]=useState()
 
  const [hideSider, setHideSider] = useState({
    isActive: true,
    comName: "Sidebar",
  });
  const storedUserDetails = localStorage.getItem("userDetails");
  const [userDetails, setUserDetails] = useState(
    storedUserDetails ? JSON.parse(storedUserDetails) : null
  );
  const value = {
    token,
    setToken,
    userDetails,
    setUserDetails,
    renderSidebar,
    setRenderSidebar,
    chatWithIcon,
    setChatWithIcon,
    chatWithUserName,
    setChatWithUserName,
    hideSider,
    setHideSider,
    conversation,
    setConversation
  };
  useEffect(() => {}, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const myHook = () => {
  const context = useContext(Context);
  return context;
};

export default myHook;
