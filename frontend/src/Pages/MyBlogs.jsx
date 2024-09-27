import { Link, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import { BACKEND_URL } from "../url";
import HomePosts from "../Components/HomePosts";
import Loader from "../Components/Loader";

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(BACKEND_URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <div>
      <Navbar />
      <div className="mt-10 mb-16 px-4 sm:px-6 md:px-10 lg:px-14 min-h-screen max-w-screen-xl mx-auto">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link to={user ? `/post/${post._id}` : "/login"} key={post._id}>
                <HomePosts post={post} />
              </Link>
            ))}
          </div>
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
