import axios from "axios";
import Footer from "../Components/Footer";
import HomePosts from "../Components/HomePosts";
import Navbar from "../Components/Navbar";
import { BACKEND_URL } from "../url.js";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../Components/Loader.jsx";
import { UserContext } from "../Context/UserContext";
import Banner from "../Components/Banner.jsx";
import Filters from "../Components/AllFilters.jsx";

const Home = () => {
  const { search } = useLocation();
  // console.log(search)
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  // console.log(user)

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(BACKEND_URL + "/api/posts/" + search);
      setPosts(res.data);
      if (res?.data?.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      <Banner />
      <Filters/>
      <div className="max-w-screen-xl mx-auto min-h-screen px-4 md:px-6 mt-10 mb-20">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : noResults ? (
          <h3 className="text-center font-bold mt-20">No posts available</h3>
        ) : Array.isArray(posts) && posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                to={user ? `/post/${post._id}` : "/login"}
                key={post._id}
                onClick={(event) => {
                  // Prevent navigation if the click originated from the like button
                  if (event.target.closest(".like-icon")) {
                    event.preventDefault(); // Prevent navigation
                  }
                }}
              >
                <HomePosts post={post} />
              </Link>
            ))}
          </div>
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
