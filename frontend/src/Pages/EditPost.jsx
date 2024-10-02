import { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { BACKEND_URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";
import JoditEditor from "jodit-react"; // Import JoditEditor
import categoriesData from "../data/categories.json";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]); // State for available categories
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      
      const res = await axios.get(BACKEND_URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCats(res.data.categories);
      setImagePreview(
        res.data.photo ? res.data.photo : null // Adjust the image preview URL if necessary
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/api/categories"); // Endpoint for fetching categories
      setAvailableCategories(res.data); // Set the available categories from the response
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    const formData = new FormData();
    // Append post details to form data
    for (const key in post) {
      formData.append(key, post[key]);
    }

    if (file) {
      const filename = Date.now() + file.name; // Generate a unique filename
      formData.append("file", file);
      post.photo = filename; // Add filename to post object
    }

    // Post update
    try {
      const res = await axios.put(
        BACKEND_URL + "/api/posts/" + postId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for FormData
          },
          withCredentials: true,
        }
      );
      navigate("/post/" + res.data._id);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchPost();
    fetchCategories(); // Fetch categories when the component mounts
  }, [postId]);

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (cat) {
      let updatedCats = [...cats];
      updatedCats.push(cat);
      setCat("");
      setCats(updatedCats);
    }
  };

  // Utility function to strip HTML tags
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || ""; // Extracts only text
  };

  return (
    <div>
      <Navbar />
      <div className="mt-10 mb-16 flex justify-center mx-5 sm:px-10 lg:px-16">
        <div
          className="bg-gray-50 rounded-lg px-8 py-8 border-2 border-gray-200"
          style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px" }}
        >
          <h1 className="font-bold md:text-2xl text-xl">
            Update your Blog Post
          </h1>
          <form
            className="w-full flex flex-col space-y-4 md:space-y-8 mt-4"
            onSubmit={handleUpdate}
          >
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter post title"
              className="px-4 py-2 rounded-full border outline-none border-blue-400 focus:border-blue-500"
            />

            {/* Custom Image Upload */}
            <div className="flex flex-col md:w-1/2 lg:w-[40%] xl:w-[30%]">
              <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                    setFile(selectedFile);
                    setImagePreview(URL.createObjectURL(selectedFile));
                  }
                }}
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
                    {file ? "Change image" : "Click or Drag to upload an image"}
                  </span>
                )}
              </label>
            </div>

            {/* Select input for categories */}
            <div className="flex space-x-5">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 rounded-full border outline-none border-blue-400 focus:border-blue-500 w-full md:w-1/2 lg:w-[40%] xl:w-[30%]"
              >
                <option value="">Select a category</option>
                {categoriesData.map((category, index) => (
                  <option key={index} value={category.name}>
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

            {/* Display selected categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
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
              onChange={(newContent) => setDesc(newContent)} // Update state on content change
            />

            <button
              type="submit" // Ensure this button submits the form
              className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg border-2 hover:bg-gray-950 rounded transition-all duration-300"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>

          {/* Display the description without HTML tags */}
          <div className="mt-6">
            <h2 className="font-semibold text-lg">Preview:</h2>
            <p>{stripHtmlTags(desc)}</p> {/* Display stripped content here */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
