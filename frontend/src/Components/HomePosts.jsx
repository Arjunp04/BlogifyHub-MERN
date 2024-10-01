import React, { useContext, useState } from "react";
import { BACKEND_URL, IF } from "../url.js";
import { FiUser, FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { UserContext } from "../Context/UserContext.jsx";
import axios from "axios";

const HomePosts = ({ post }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [isPostLiked, setIsPostLiked] = useState(post.likes.includes(user?.id));
  const [likesCount, setLikesCount] = useState(post.likes.length || 0);

  const handleReadMore = () => {
    navigate(`/post/${post._id}`);
  };

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent || "";
  };

  const getShortTitle = (title) => {
    return title.length > 34 ? title.slice(0, 34) + "..." : title;
  };

  const getShortDescription = (description) => {
    const strippedDescription = stripHtmlTags(description);
    return strippedDescription.length > 120
      ? strippedDescription.slice(0, 120) + "..."
      : strippedDescription;
  };

  const handleLikes = async () => {
    setIsPostLiked((prev) => !prev);
    const updatedLikesCount = isPostLiked ? likesCount - 1 : likesCount + 1;
    setLikesCount(updatedLikesCount);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/posts/${post._id}/like`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error liking/unliking post:", error);
      setIsPostLiked((prev) => !prev);
      setLikesCount(isPostLiked ? likesCount : likesCount - 1);
    }
  };

  return (
    <div className="w-full transition-all hover:scale-[1.02] duration-300">
      <div
        className="flex flex-col bg-gray-200 border-gray-300 p-3 rounded-md border h-[380px]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <div className="w-full h-[200px] sm:h-[220px] max-h-[220px] flex justify-center items-center">
          <img
            src={IF + post.photo}
            alt="blog's image title"
            className="h-full w-full border border-gray-300 rounded-lg bg-yellow-600 shrink-0"
          />
        </div>
        <div className="flex flex-col flex-grow justify-between">
          <h1
            className="text-xl font-bold md:mb-2 mt-1 md:text-xl"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {getShortTitle(post.title)}
          </h1>
          <div className="flex justify-between text-sm font-semibold text-gray-500 items-center md:-mt-1">
            <div className="flex space-x-3">
              <div className="flex items-center space-x-0.5">
                <FiUser className="text-gray-600" />
                <p>@{post.username}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-0.5">
                  <FiCalendar className="text-gray-600" />
                  <p>
                    {new Date(post?.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="mr-2 flex items-center">
              {isPostLiked ? (
                <FaHeart
                  size={18}
                  className="text-red-600 cursor-pointer like-icon"
                  onClick={handleLikes}
                />
              ) : (
                <FaRegHeart
                  size={18}
                  className="text-gray-600 cursor-pointer like-icon"
                  onClick={handleLikes}
                />
              )}
              <span className="ml-1 text-sm">{likesCount}</span>
            </div>
          </div>
          <p className="text-sm bg-gray-5 border bg-gray-100 text-gray-950 px-2 py-1 rounded-md my-2">
            {getShortDescription(post.desc)}
            <span
              onClick={handleReadMore}
              className="text-blue-700 cursor-pointer hover:underline"
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
