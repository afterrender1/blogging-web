import Post from "../models/Post.js"
import dbConnect from "../lib/db.js";

export const createPost = async (req, res) => {
  try {
    await dbConnect();

    const { title, intro, content } = req.body;
    if (!req.file) return res.status(400).json({ error: "Image required" });

    const imageUrl = `/uploads/${req.file.filename}`;

    const post = await Post.create({ title, intro, content, imageUrl });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create post" });
  }
};
