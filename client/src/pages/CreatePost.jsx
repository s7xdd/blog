import "../styles/Createpost.css";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import { UserContext } from "../UserContext";

const CreatePost = (ev) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [cookies, setCookies] = useState();
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    ev.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_URL}/post`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      alert("Post created successfully");
      setRedirect(true);
    } else {
      alert('Error');
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  if (userInfo.id == null) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="create-post-cont">
      <div className="create-post-inner">
        <h1>Create New Post</h1>
      <form onSubmit={createNewPost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <Editor onChange={setContent} value={content} />
        <button className="create-btn btn btn-primary">Create Post</button>
      </form>
      </div>
    </div>
  );
};

export default CreatePost;
