import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    intro: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            comment: {
                type: String,
                required: true,
                trim: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }


    ],
    createdAt: { type: Date, default: Date.now }

})

const Post = mongoose.model("Post", postSchema);
export default Post;
