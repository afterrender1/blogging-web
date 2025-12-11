import express from "express";
import { createPost, getPostById, showPosts } from "../controllers/postController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/single-post/:id", getPostById);
router.post("/", upload.single("image"), createPost);
router.get("/all-posts" , showPosts )

export default router;
