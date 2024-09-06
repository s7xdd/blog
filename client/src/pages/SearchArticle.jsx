import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoResults from "../components/NoResults";
import BlogPost from "../components/BlogPost";

const SearchArticle = () => {

  const [posts, setPosts] = useState([]);
    const { title } = useParams();

  useEffect(() => {
   

    fetch(`${import.meta.env.VITE_URL}/post/search/${title}`).then(
      (response) => {
        response.json().then((posts) => {
          setPosts(posts);
        })
      }
    )
  }, []);

  if(!posts){
    return(
        <div>
           <NoResults/>
        </div>
    )
  }

  return (
    <div className="allpost-cont">
      <div className="allpost-inner-cont">
        <div>
          <h1>Search results</h1>
          <div className="allposts">
            {posts.length > 0 && posts.map((post) => <BlogPost {...post} />)}
          </div>
        </div>
      </div>
    </div>
  )
  
};

export default SearchArticle;
