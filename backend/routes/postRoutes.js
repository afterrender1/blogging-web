import express from "express";
import { createPost } from "../controllers/postController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), createPost);

export default router;
