import express from "express";
import dotenv from "dotenv"
import dbConnect from "./lib/db.js";
import cors from "cors"
import path from "path";
import postRoutes from "./routes/postRoutes.js"
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
dotenv.config()


const app = express();
app.use(cors(
    {
        origin : "http://localhost:3000",
        credentials : true 
    }
));
app.use(express.json());
app.use(cookieParser())
app.use("/uploads", express.static(path.join(process.cwd(), "/public/uploads")));
    
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRouter)

const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log("🚀 ~ server stared at port :", port)
    dbConnect()
})

