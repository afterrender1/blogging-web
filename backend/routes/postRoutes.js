import express from "express";
import { createPost, showPosts } from "../controllers/postController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), createPost);
router.get("/all-posts" , showPosts )

export default router;
