import express from "express";
const router = express.Router();
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import verifyToken from "../middlewares/verifyToken.js";
import upload from "../middlewares/multer.js";
import cloudinary from "../config/cloudinary.js";

// Create a post with image upload
router.post("/create", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const file = req.file; // Access the uploaded file buffer

    // Check if a file was uploaded
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload image to Cloudinary using the buffer
    const uploadResult =  cloudinary.uploader.upload_stream(
      { folder: "blogifuhub/blog posts" },
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Error uploading to Cloudinary", error });
        }

        // Create new post with image URL
        const newPost = new Post({
          ...req.body,
          photo: result.secure_url,
        });

        // Save the post to the database
        newPost.save()
          .then(savedPost => res.status(200).json(savedPost))
          .catch(err => res.status(500).json({ message: "Error saving post", error: err.message }));
      }
    ).end(file.buffer); // Pass the buffer to upload_stream

  } catch (err) {
    res.status(500).json({ message: "Error uploading post", error: err.message });
  }
});

// Update a post with image upload
router.put("/:id", verifyToken, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    let updateData = { ...req.body };

    if (file) {
      // If a new file is uploaded, upload to Cloudinary using the buffer
      cloudinary.uploader.upload_stream(
        { folder: "blogifuhub/blog posts" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: "Error uploading to Cloudinary", error });
          }

          // Update with the new image URL
          updateData.photo = result.secure_url; // Update the field with the new image URL

          try {
            const updatedPost = await Post.findByIdAndUpdate(
              req.params.id,
              { $set: updateData },
              { new: true }
            );
            return res.status(200).json(updatedPost);
          } catch (err) {
            return res.status(500).json({ message: "Error updating post", error: err.message });
          }
        }
      ).end(file.buffer); // Pass the buffer to upload_stream
    } else {
      // If no new file is uploaded, update the post without changing the image
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
      );
      return res.status(200).json(updatedPost);
    }
  } catch (err) {
    return res.status(500).json({ message: "Error updating post", error: err.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("Post has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post details
router.get("/:id", async (req, res) => {
  try {
    console.log("Fetching post details for postId:", req.params.id);
    const post = await Post.findById(req.params.id);

    if (!post) {
      console.log("Post not found:", req.params.id);
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error("Error fetching post details:", err);
    res.status(500).json(err);
  }
});

//get all postsand search for the post
router.get("/", async (req, res) => {
  const query = req.query;

  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };

    const posts = await Post.find(query.search ? searchFilter : null);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user posts
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// posts like and unlike
router.post("/:postId/like", verifyToken, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  try {
    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({
        message: "Post not found",
      });

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id !== userId);
      await post.save();
      return res.status(200).json({ message: "Post unliked", post });
    } else {
      post.likes.push(userId);
      await post.save();
      return res.status(200).json({ message: "Post liked", post });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
