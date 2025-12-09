import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
title : {type : String , required : true},
intro : {type : String , required : true},
content : {type : String , required : true}, 
imageUrl : {type: String ,  required : true},
createdAt : {type : Date , default : Date.now}

})

const Post = mongoose.model("Post", postSchema);
export default Post;
