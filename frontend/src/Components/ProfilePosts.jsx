import React, { useEffect, useState } from "react";
import { IF } from "../url.js";
import { useNavigate } from "react-router-dom";

const ProfilePosts = ({ p }) => {
  const navigate = useNavigate();
   const [descLength, setDescLength] = useState(100);

  
   useEffect(() => {
     const handleResize = () => {
       if (window.innerWidth >= 1024) {
         setDescLength(250); // Large screens (lg)
       } else if (window.innerWidth >= 768) {
         setDescLength(250); // Medium screens (md)
       } else if (window.innerWidth >= 550) {
         setDescLength(160); // Medium screens (md)
       } else {
         setDescLength(120); // Small screens (sm)
       }
     };

     handleResize(); // Set initial length based on screen size
     window.addEventListener("resize", handleResize); // Adjust length on screen resize

     return () => window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
   }, []);

  const handleReadMore = () => {
    navigate(`/post/${p._id}`); // Navigate to /post/{post._id} when clicked
  };

  // console.log(p)
  return (
    <div className="w-full">
      <div className="flex mt-2 space-x-4 bg-gray-200 p-2 rounded border-4 transition-all hover:scale-[1.01] duration-300"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 2px 15px" }}
      >
        {/* left */}
        <div className="w-[30%] h-[150px] flex justify-center items-center">
          <img
            src={IF + p.photo}
            alt=""
            className="h-full w-full object-cover border shrink-0 border-gray-400 rounded-lg"
          />
        </div>
        {/* right */}
        <div className="flex flex-col w-[70%]">
          <h1 className="text-xl font-bold mb-1 md:text-2xl">{p.title}</h1>
          <div className="flex text-sm font-semibold text-gray-500 items-center justify-between">
            <p>@{p.username}</p>
            <div className="flex space-x-2">
              <p>
                {new Date(p?.updatedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <p className=" text-sm bg-gray-5 border bg-gray-100 text-gray-950 px-2 py-1 rounded-md my-2">
            {p.desc.slice(0, descLength)}...
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

export default ProfilePosts;
