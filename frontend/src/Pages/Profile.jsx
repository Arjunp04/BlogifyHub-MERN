import { useContext, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import ProfilePosts from "../Components/ProfilePosts";
import axios from "axios";
import { IF, URL } from "../url";
import { UserContext } from "../Context/UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUser, FaEnvelope } from "react-icons/fa"; // Import icons from react-icons

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);
  // console.log(user)

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      // console.log(res.data)
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
      // console.log(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  // console.log(user)
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      // console.log(res.data)
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-10 flex flex-col lg:flex-row items-center lg:items-start md:space-x-10 max-lg:space-y-8 mx-4 lg:mx-10 xl:mx-16 mb-20">
        {/* Profile Section */}
        <div className="lg:sticky flex items-center justify-center lg:w-[30%] lg:top-24">
          <div className="bg-gray-200 px-5 py-5 rounded-lg border border-gray-400"
            style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px" }}
          >
            <div className="flex flex-col space-y-4 items-start">
              <h1 className="text-xl font-bold">Profile</h1>
              <hr className="border-gray-500 w-full" />

              {/* Username Input with Icon */}
              <div className="relative w-full">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="pl-10 px-4 py-2 w-full text-gray-500 rounded border outline-none focus:border-blue-500 border-gray-300"
                  placeholder="Your username"
                  type="text"
                />
              </div>

              {/* Email Input with Icon */}
              <div className="relative w-full">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="pl-10 px-4 py-2 w-full text-gray-500 rounded border outline-none focus:border-blue-500"
                  placeholder="Your email"
                  type="email"
                />
              </div>

              <div className="flex items-center mx-6 space-x-8 mt-8 ">
                <button
                  onClick={handleUserUpdate}
                  className="text-white font-semibold bg-gray-950 px-4 py-2 hover:text-white hover:bg-black"
                >
                  Update
                </button>
                <button
                  onClick={handleUserDelete}
                  className="text-white font-semibold bg-red-600 px-4 py-2 hover:text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
              {updated && (
                <h3 className="text-green-500 text-sm text-center mt-4">
                  User updated successfully!
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="flex flex-col lg:w-[70%] ">
          <h1 className="text-xl font-bold mb-4">Your posts:</h1>
          <div className="flex flex-col space-y-5">
            {posts?.map((p) => (
              <Link key={p._id} to={`/posts/${p._id}`}>
                {" "}
                {/* Dynamic link to each post */}
                <ProfilePosts p={p} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
