import express from "express";
import dotenv from "dotenv"
import dbConnect from "./lib/db.js";
import cors from "cors"
import path from "path";
import postRoutes from "./routes/postRoutes.js"
dotenv.config()


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "/public/uploads")));

app.use("/api/posts", postRoutes);

const port = process.env.PORT || 5000;


app.listen(port , ()=> {
    console.log("🚀 ~ server stared at port :", port)
    dbConnect()
})
