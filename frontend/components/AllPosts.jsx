"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const AllPosts = () => {
  const [post, setPost] = useState([]);
  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/posts/all-posts");
      const data = await res.json();
      console.log(data.posts);
      setPost(data.posts);
    } catch (error) {
      console.log("🚀 ~ allPosts ~ error:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
     {
      post.map((p)=> (

<div key={p._id}>
  <Image src={`http://localhost:8000${p.imageUrl}`} width={80} height={80} alt/>
  {p.imageUrl}
  <br />
{p.title}
<div>{p.intro}</div>
{p.content}
</div>

      ))
     }
    </>
  );
};

export default AllPosts;
