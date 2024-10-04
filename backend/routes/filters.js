import express from "express";
const router = express.Router();
import categoriesData from "../data/categories.json" assert { type: "json" };
import Post from "../models/Post.js";

router.get("/all-categories", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: categoriesData,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

// Fetch filtered posts using POST request
router.post("/", async (req, res) => {
  try {
    const { category, date, popularity } = req.body;
    // console.log({ category, date, popularity });

    let query = {};

    // If "All Categories" is selected, do not apply any category filter
    if (category && category !== "All Categories") {
      query.categories = { $in: [category] }; // Use $in operator for array
    }

    // Apply date filter (for "Newest", "Last Week", "Last Month", "This Year")
    if (date) {
      const now = new Date();
      if (date === "Last Week") {
        query.createdAt = { $gte: new Date(now.setDate(now.getDate() - 7)) };
      } else if (date === "Last Month") {
        query.createdAt = { $gte: new Date(now.setMonth(now.getMonth() - 1)) };
      } else if (date === "This Year") {
        query.createdAt = { $gte: new Date(now.getFullYear(), 0, 1) };
      } else if (date === "Newest") {
        // For newest, sort the posts in descending order based on createdAt
        return res.status(200).json({
          posts: await Post.find(query).sort({ createdAt: -1 }),
          count: await Post.countDocuments(query),
        });
      }
    }

    // Apply sorting for popularity (for example, sorting by 'likes')
    let sortOptions = {};
    if (popularity === "Most Liked") {
      sortOptions.likes = -1; // Sorting by 'likes' in descending order
    } else if (date === "Newest") {
      sortOptions.createdAt = -1; // Sorting by creation date for newest
    }

    // Fetch posts based on filters
    const posts = await Post.find(query).sort(sortOptions);
    // console.log("*************");
    // console.log(posts);

    // console.log("@@@@@@@@@@@@@@@@@@@@@@@");
    // console.log(query);

    // Check if any posts were found
    if (posts.length === 0) {
      return res.status(200).json({
        message: "No posts found with applied filters.",
        count: 0, // Return count as 0 if no posts found
        posts: [],
      });
    }

    // If posts are found, return them along with the count
    res.status(200).json({ posts, count: posts.length }); // Send post count and filtered posts
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Error fetching posts." });
  }
});


export default router;
