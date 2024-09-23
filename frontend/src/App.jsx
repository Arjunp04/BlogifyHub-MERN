import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import CreatePost from "./Pages/CreatePost";
import PostDetails from "./Pages/PostDetails";
import EditPost from "./Pages/EditPost";
import MyBlogs from "./Pages/MyBlogs";
import Profile from "./Pages/Profile";
import { UserContextProvider } from "./Context/UserContext";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions";
import ContactUs from "./Pages/ContactUs";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/write" element={<CreatePost />} />
        <Route exact path="/posts/post/:id" element={<PostDetails />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/myblogs/:id" element={<MyBlogs />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </UserContextProvider>
  );
};

export default App;
