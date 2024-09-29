import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./Context/UserContext";
import Loader from "./Components/Loader";

// Lazy load your components
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const ChangePassword = lazy(() => import("./Pages/ChangePassword"));
const ForgotPassword = lazy(() => import("./Pages/ForgotPassword"));
const CreatePost = lazy(() => import("./Pages/CreatePost"));
const PostDetails = lazy(() => import("./Pages/PostDetails"));
const EditPost = lazy(() => import("./Pages/EditPost"));
const MyBlogs = lazy(() => import("./Pages/MyBlogs"));
const Profile = lazy(() => import("./Pages/Profile"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./Pages/TermsAndConditions"));
const ContactUs = lazy(() => import("./Pages/ContactUs"));

const App = () => {
  return (
    <UserContextProvider>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset-password/:token" element={<ChangePassword />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/write" element={<CreatePost />} />
          <Route exact path="/post/:id" element={<PostDetails />} />
          <Route exact path="/edit/:id" element={<EditPost />} />
          <Route exact path="/myblogs/:id" element={<MyBlogs />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsAndConditions />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Suspense>
    </UserContextProvider>
  );
};

export default App;
