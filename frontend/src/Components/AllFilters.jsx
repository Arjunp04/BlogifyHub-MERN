// src/components/Filters.jsx
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Filters = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDate, setSelectedDate] = useState("Newest");
  const [selectedPopularity, setSelectedPopularity] = useState("Most Liked");

  const categories = [
    "All Categories",
    "Technology",
    "Lifestyle",
    "Travel",
    "Food",
    "Business",
  ];
  const dateOptions = ["Newest", "Last Week", "Last Month", "This Year"];
  const popularityOptions = ["Most Liked"];

  return (
    <div className="flex flex-col sm:flex-row mx-auto gap-4 md:gap-6 max-w-screen-xl mt-12 px-4 md:px-6">
      {/* Category Dropdown */}
      <div className="relative w-full md:w-auto">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="appearance-none w-full md:w-40 px-4 py-2 text-gray-800 bg-white border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <FaChevronDown
          size={14}
          className="absolute right-3 top-4 text-gray-600 pointer-events-none"
        />
      </div>

      {/* Recent Posts Dropdown */}
      <div className="relative w-full md:w-auto">
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="appearance-none w-full md:w-28 px-4 py-2 text-gray-800 bg-white border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
        >
          {dateOptions.map((date, index) => (
            <option key={index} value={date}>
              {date}
            </option>
          ))}
        </select>
        <FaChevronDown
          size={14}
          className="absolute right-3 top-4 text-gray-600 pointer-events-none"
        />
      </div>

      {/* Popularity (Most Liked) Dropdown */}
      <div className="relative w-full md:w-auto">
        <select
          value={selectedPopularity}
          onChange={(e) => setSelectedPopularity(e.target.value)}
          className="appearance-none w-full md:w-[135px] px-4 py-2 text-gray-800 bg-white border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
        >
          {popularityOptions.map((popularity, index) => (
            <option key={index} value={popularity}>
              {popularity}
            </option>
          ))}
        </select>
        <FaChevronDown
          size={14}
          className="absolute right-3 top-4 text-gray-600 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default Filters;
