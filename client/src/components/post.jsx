import "../styles/post.css";
import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({
  _id,
  key,
  title,
  content,
  summary,
  cover,
  createdAt,
  author,
}) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`${import.meta.env.VITE_URL}/` + cover} alt="" />
        </Link>
      </div>

      <div className="texts" style={{maxWidth: '560px'}}>
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>

        <p className="info">
          <a href="" className="author">
            {author.username}
          </a>
          <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
};

export default Post;
