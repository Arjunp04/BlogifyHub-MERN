import { useNavigate, useParams } from "react-router-dom";
import Comment from "../Components/Comment";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { BACKEND_URL, IF } from "../url.js";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import Loader from "../Components/Loader";
import { FiCalendar, FiUser } from "react-icons/fi";

const PostDetails = () => {
  const postId = useParams().id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      console.log("postId:", postId); // Log the postId for debugging
      const res = await axios.get(BACKEND_URL + "/api/posts/" + postId);
      console.log(res.data);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(BACKEND_URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(BACKEND_URL + "/api/comments/post/" + postId);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BACKEND_URL + "/api/comments/create",
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );

      // fetchPostComments()
      // setComment("")
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Utility function to strip HTML tags
  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText || tempDiv.textContent || "";
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-4 sm:px-8 md:px-12 max-w-screen-xl  mx-auto mt-10 mb-16">
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold text-black sm:text-3xl md:text-4xl ">
              {post.title}
            </h1>
          </div>
          <div className="w-full max-w-md sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto">
            <img
              src={IF + post.photo}
              className="w-full max-w-md sm:max-w-3xl md:max-w-4xl lg:max-w-5xl h-[400px] max-h-[400px] mx-auto mt-5 md:mt-8"
              alt=""
            />
            <div className="flex text-sm font-semibold text-gray-600 items-center mt-4 justify-between">
              <div className="flex space-x-3">
                <div className="flex items-center space-x-0.5">
                  <FiUser className="text-gray-600" />
                  <p>@{post.username}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-0.5">
                    <FiCalendar className="text-gray-600" />
                    <p>
                      {new Date(post?.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {user?._id === post?.userId && (
                <div className="flex items-center justify-center -mt-2">
                  <p
                    className="cursor-pointer"
                    onClick={() => navigate("/edit/" + postId)}
                  >
                    <BiEdit
                      size={30}
                      color="blue"
                      className="hover:bg-black hover:bg-opacity-15 p-1 duration-200 rounded-full"
                    />
                  </p>
                  <p className="cursor-pointer" onClick={handleDeletePost}>
                    <MdDelete
                      size={30}
                      color="red"
                      className="hover:bg-black hover:bg-opacity-15 p-1 duration-200 rounded-full"
                    />
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center mt-3 space-x-4 font-semibold ">
              <p>Categories:</p>
              <div className="flex justify-center items-center space-x-2">
                {post.categories?.map((c, i) => (
                  <>
                    <div key={i} className="bg-gray-300 rounded-lg px-3 py-1">
                      {c}
                    </div>
                  </>
                ))}
              </div>
            </div>
            <p className="mx-auto mt-4 bg-gray-100 py-2 px-4 rounded border border-gray-200">
              {stripHtmlTags(post.desc)} {/* Strip HTML tags here */}
            </p>
          </div>

          <div className="w-full h-px bg-slate-400 mt-6"></div>
          <div className="flex flex-col">
            <h3 className="mt-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comment key={c._id} c={c} post={post} />
            ))}
          </div>
          {/* write a comment */}
          <div className="w-full flex flex-col mt-4 md:flex-row space-x-5">
            <input
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%]  py-2 px-4 mt-4 bg-gray-50 border border-gray-400 rounded-full md:mt-0 focus:outline-none focus:border-blue-700"
            />
            <button
              onClick={postComment}
              className="bg-gray-900 rounded-full hover:bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
