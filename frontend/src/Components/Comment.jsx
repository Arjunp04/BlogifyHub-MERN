import React from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FiCalendar, FiClock } from "react-icons/fi"; // Calendar and clock icons
import { BACKEND_URL } from "../url.js";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";

const Comment = ({ c, post }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(BACKEND_URL + "/api/comments/" + id, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // Format the date and time
  const formattedDate = new Date(c.updatedAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = new Date(c.updatedAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="bg-gray-200 rounded-lg my-2 p-1">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600 px-1">@{c.author}</h3>
        <div className="flex justify-center items-center space-x-3 px-2">
          {/* Display date with calendar icon */}
          <div className="flex items-center space-x-1">
            <FiCalendar className="text-gray-600" />
            <p>{formattedDate}</p>
          </div>
          {/* Display time with clock icon */}
          <div className="flex items-center space-x-1">
            <FiClock className="text-gray-600" />
            <p>{formattedTime}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-1">
        <p className="px-2 text-sm">{c.comment}</p>
        {/* Conditionally render delete button */}
        {user?._id === c?.userId && (
          <div className="flex items-center justify-center px-2">
            <p className="cursor-pointer" onClick={() => deleteComment(c._id)}>
              <MdDelete className="text-red-600" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
