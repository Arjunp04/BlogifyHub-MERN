import React, { useContext, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { ImCross } from "react-icons/im";
import { UserContext } from "../Context/UserContext.jsx";
import { BACKEND_URL } from "../url.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react"; // Import JoditEditor
import categoriesData from "../data/categories.json";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState(""); // Editor content
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);
  const [cat, setCat] = useState(""); // Selected category
  const [cats, setCats] = useState([]);
  const [imagePreview, setImagePreview] = useState(null); // Image preview state
  const [loading, setLoading] = useState(false); // For loading state

  const navigate = useNavigate();

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (cat && !cats.includes(cat)) {
      let updatedCats = [...cats];
      updatedCats.push(cat);
      setCat("");
      setCats(updatedCats);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile)); // Create image preview
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state when API call begins

    const postData = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
      file: file, // Include file in post data
    };

    const data = new FormData();
    for (const key in postData) {
      data.append(key, postData[key]);
    }

    // Post upload
    try {
      const res = await axios.post(`${BACKEND_URL}/api/posts/create`, data, {
        withCredentials: true,
      });
      setLoading(false); // Turn off loading once done
      navigate("/post/" + res.data._id);
    } catch (err) {
      console.log("Error uploading post:", err);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-10 mb-16 flex justify-center mx-5 sm:px-10 lg:px-16">
        <div
          className="bg-gray-50 rounded-lg px-8 py-8 border-2 border-gray-200"
          style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px" }}
        >
          <h1 className="font-bold md:text-2xl text-xl ">
            Create your Blog Post
          </h1>
          <p className="mt-4 text-gray-700">
            Welcome to the blog post creation page! Here, you can share your
            thoughts, experiences, or insights with the world. Please fill in
            the form below with the details of your blog post:
          </p>
          <form
            className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
            onSubmit={handleCreate}
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Enter post title"
              className="px-4 py-2 rounded-full border outline-none border-blue-400 focus:border-blue-500"
              required
            />

            {/* Image Upload */}
            <div className="flex flex-col md:w-1/2 lg:w-[40%] xl:w-[30%]">
              <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              <label
                htmlFor="file-input"
                className="flex items-center justify-center border-2 border-dashed border-blue-400 rounded-md h-48 cursor-pointer hover:bg-gray-100 transition duration-200"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  <span className="text-gray-600">
                    Click or Drag to upload an image
                  </span>
                )}
              </label>
            </div>

            {/* Category Selection */}
            <div className="flex space-x-5">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 rounded-full border outline-none border-blue-400 focus:border-blue-500 w-full md:w-1/2 lg:w-[40%] xl:w-[30%]"
              >
                <option value="">Select a category</option>
                {categoriesData.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>

              <div
                onClick={addCategory}
                className="bg-gray-950 hover:bg-black text-white px-4 py-2 font-semibold cursor-pointer mt-2"
              >
                Add
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap">
              {cats.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-300 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-red-500 rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross size={8} />
                  </p>
                </div>
              ))}
            </div>

            {/* Jodit Editor for description */}
            <JoditEditor
              value={desc}
              onChange={(newContent) => setDesc(newContent)}
              required
            />

            <button
              type="submit"
              className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg border-2 hover:bg-gray-950 rounded transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePost;

