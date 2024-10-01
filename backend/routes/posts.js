import express from "express";
const router = express.Router();
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import verifyToken from "../verifyToken.js";

router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
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

  console.log("Post ID:", postId); // Log the post ID
  console.log("User ID:", userId); // Log the user ID

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
