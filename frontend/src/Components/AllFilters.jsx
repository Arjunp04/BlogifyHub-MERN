import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import useFetchCategories from "../hooks/UseFetchCategories"; // Custom Hook

const Filters = ({ onFilterChange }) => {
  const { categoriesList } = useFetchCategories();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDate, setSelectedDate] = useState("Newest");
  const [selectedPopularity, setSelectedPopularity] = useState("Most Liked");
  const [showClearButton, setShowClearButton] = useState(false); // State to track clear button visibility

  const dateOptions = ["Newest", "Last Week", "Last Month", "This Year"];
  const popularityOptions = ["Most Liked"];

  // Trigger filter change when any of the filter states change
  useEffect(() => {
    handleFilterChange();

    // Show the clear button if any filter has changed
    setShowClearButton(
      selectedCategory !== "All Categories" ||
        selectedDate !== "Newest" ||
        selectedPopularity !== "Most Liked"
    );
  }, [selectedCategory, selectedDate, selectedPopularity]);

  const handleFilterChange = () => {
    onFilterChange({
      category: selectedCategory,
      date: selectedDate,
      popularity: selectedPopularity,
    });
  };

  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedDate("Newest");
    setSelectedPopularity("Most Liked");
    setShowClearButton(false); // Hide the clear button after clearing
  };

  return (
    <div className="flex flex-col sm:flex-row mx-auto gap-4 md:gap-6 max-w-screen-xl mt-12 px-4 md:px-6">
      <div className="relative w-full md:w-auto">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="appearance-none w-full md:w-48 px-4 py-2 text-gray-800 bg-white border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
        >
          <option value="All Categories">All Categories</option>
          {categoriesList.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <FaChevronDown
          size={14}
          className="absolute right-3 top-4 text-gray-600 pointer-events-none"
        />
      </div>

      <div className="relative w-full md:w-auto">
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="appearance-none w-full md:w-36 px-4 py-2 text-gray-800 bg-white border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
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

      <div className="relative w-full md:w-auto">
        <select
          value={selectedPopularity}
          onChange={(e) => setSelectedPopularity(e.target.value)}
          className="appearance-none w-full md:w-36 px-4 py-2 text-gray-800 bg-white border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
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

      {/* Clear Filters Button - only show if showClearButton is true */}
      {showClearButton && (
        <button
          onClick={clearFilters}
          className="self-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default Filters;
