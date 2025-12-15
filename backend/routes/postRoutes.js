import express from "express";
import { commentPost, createPost, getPostById, likePost, showPosts } from "../controllers/postController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/:postId/like-post", likePost);
router.post("/:postId/comment", commentPost);
router.get("/single-post/:id", getPostById);
router.post("/", upload.single("image"), createPost);
router.get("/all-posts", showPosts)

export default router;
