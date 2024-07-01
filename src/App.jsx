import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./Components/Context";
import { Toaster } from "react-hot-toast";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import Users from "./Components/Users";
import MainContainer from "./Components/MainContainer";
import Chats from "./Components/Chats"
import CreateGroup from "./Components/CreateGroup";
import Groups from "./Components/Groups";
import Profile from "./Components/Profile";
import Home from "./Components/Home";
import "./App.css"
function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/auth/login" element={<Login />}></Route>
            <Route path="/auth/signUp" element={<SignUp />}></Route>
            <Route path="chats" element={<MainContainer />}>
              <Route path="users" element={<Users />}></Route>
              <Route path="chat/:id" element={<Chats />}></Route>
              <Route path="createGroup" element={<CreateGroup />}></Route>
              <Route path="groups" element={<Groups />}></Route>
              <Route path="profile" element={<Profile />}></Route>
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
