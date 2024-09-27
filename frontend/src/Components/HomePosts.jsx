import React from "react";
import { IF } from "../url.js";
import { FiUser, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const HomePosts = ({ post }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleReadMore = () => {
    navigate(`/post/${post._id}`); // Navigate to /post/{post._id} when clicked
  };

  // Utility function to strip HTML tags
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent || "";
  };

  return (
    <div className="w-full transition-all hover:scale-[1.02] duration-300">
      <div
        className="flex flex-col bg-gray-200 border-gray-300 p-3 rounded-md border h-[380px]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        {/* Image */}
        <div className="w-full h-[200px] sm:h-[220px] max-h-[220px] flex justify-center items-center">
          <img
            src={IF + post.photo}
            alt="blog's image title"
            className="h-full w-full border border-gray-300 rounded-lg bg-yellow-600 shrink-0"
          />
        </div>
        {/* Post Details */}
        <div className="flex flex-col flex-grow justify-between">
          <h1 className="text-xl font-bold md:mb-2 mt-1 md:text-xl">
            {post.title.slice(0, 34)}...
          </h1>
          <div className="flex text-sm font-semibold text-gray-500 items-center space-x-3 -mt-1">
            <div className="flex items-center space-x-0.5">
              <FiUser className="text-gray-600" />
              <p>@{post.username}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-0.5">
                <FiCalendar className="text-gray-600" />
                <p>
                  {new Date(post?.updatedAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
          <p className=" text-sm bg-gray-5 border bg-gray-100 text-gray-950 px-2 py-1 rounded-md my-2">
            {stripHtmlTags(post.desc.slice(0, 120))}...
            <span
              onClick={handleReadMore}
              className="text-blue-700  cursor-pointer hover:underline"
            >
              {" "}
              Read more
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};


export default HomePosts;
