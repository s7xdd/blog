import '../styles/AllPosts.css'
import React from "react";
import Post from "../components/post";
import { useState, useEffect } from "react";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/post`).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div className="allposts">
      {posts.length > 0 && posts.map((post) => <Post {...post} />)}
      </div>
  );
};

export default AllPosts;
