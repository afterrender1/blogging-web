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


export const showPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    if (!allPosts) return res.status(404).json({ success: false, message: "there is no any posts " })
    res.json({
      success: true,
      posts: allPosts
    })
  } catch (error) {
    res.status(500).json({
      message: "server error"
    })
  }
}

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id is required" })
    const singlePost = await Post.findById(id)
    if (!singlePost) return res.send(404).json({ message: "Blog post not found!" })
    res.status(200).json({
      success: true,
      post: singlePost,
    })


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server error"
    })

  }


}


export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId)
      return res.status(400).json({ message: "User id required" });

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: "Post not found" });

    const isLiked = post.likedBy.includes(userId);

    if (isLiked) {
      // 👎 DISLIKE (remove like)
      post.likedBy = post.likedBy.filter(
        id => id.toString() !== userId
      );
    } else {
      // 👍 LIKE
      post.likedBy.push(userId);
    }

    await post.save();

    res.status(200).json({
      message: isLiked ? "Post disliked" : "Post liked",
      totalLikes: post.likedBy.length,
      liked: !isLiked
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
