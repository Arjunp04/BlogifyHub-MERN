import React from 'react'
import banner from "../assets/banner.png"

const Banner = () => {
  return (
    <div className="mx-auto w-full h-72 md:h-96 px-4  xl:px-10 max-w-screen-2xl">
      <img
        src={banner}
        alt="banner"
        className="w-full h-full bg-red-400 mt-10 rounded-xl"
        style={{ boxShadow: "rgba(0, 0, 0, 0.7) 0px 5px 10px" }}
      />
    </div>
  );
}

export default Banner