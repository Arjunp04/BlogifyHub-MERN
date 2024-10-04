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
    const { category, date, popularity, searchQuery } = req.body;

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
        query.createdAt = {
          $gte: new Date(now.setFullYear(now.getFullYear())),
        };
      }
    }

    // Apply popularity filter (sort order)
    const sortOptions = {};
    if (popularity === "Most Liked") {
      sortOptions.likes = -1; // Sort by likes in descending order
    } else if (popularity === "Least Liked") {
      sortOptions.likes = 1; // Sort by likes in ascending order
    }

    // Add search query to the MongoDB query
    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" }; // Case-insensitive regex search
    }

    // Find posts based on query
    const posts = await Post.find(query).sort(sortOptions);
    const count = await Post.countDocuments(query); // Get count of filtered posts

    res.status(200).json({ posts, count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});


export default router;
