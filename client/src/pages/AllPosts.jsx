import "../styles/Allposts.css";
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
    <div className="allpost-cont">
      <div className="allpost-inner-cont">
        <div className="inner">
          <h1>All Posts</h1>
          <div className="allposts">
            {posts.length > 0 && posts.map((post) => <Post {...post} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
