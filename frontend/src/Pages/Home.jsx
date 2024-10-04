import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BACKEND_URL } from "../url.js";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader.jsx";
import { UserContext } from "../Context/UserContext";
import Filters from "../Components/AllFilters.jsx";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import HomePosts from "../Components/HomePosts";
import Banner from "../Components/Banner.jsx";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const [filters, setFilters] = useState({
    category: "All Categories",
    date: "Newest",
    popularity: "Most Liked",
  });
  const [postCount, setPostCount] = useState(0); // Count of filtered posts

  // Send selected filters to backend via POST request
  const applyFilters = async () => {
    setLoader(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/api/filter`, filters, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("apply filters :", res);
      setPosts(res.data.posts); // Set posts from API response
      setPostCount(res.data.count); // Set the filtered posts count
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false); // Ensure loader is turned off in both success and error cases
    }
  };

  // Fetch posts when filters are changed
  useEffect(() => {
    applyFilters(); // Apply filters whenever they are updated
  }, [filters]); 

  // Handle filter change from Filters component
  const handleFilterChange = (newFilters) => {
    // console.log("Filter selected:", newFilters);
    setFilters(newFilters); // Only update filters here; useEffect will handle fetching posts
  };

  return (
    <>
      <Navbar />
      <Banner />
      <Filters onFilterChange={handleFilterChange} />
      <div className="max-w-screen-xl mx-auto min-h-screen px-4 md:px-6 mt-6 mb-20">
        <h3 className="text-center font-bold mb-6">{postCount} Posts found</h3>
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : postCount === 0 ? ( // Check if no posts available based on count
          <div className="text-center mt-40">
            <h3 className="font-bold">No posts available</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                to={user ? `/post/${post._id}` : "/login"}
                key={post._id}
                onClick={(event) => {
                  if (event.target.closest(".like-icon")) {
                    event.preventDefault();
                  }
                }}
              >
                <HomePosts post={post} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
