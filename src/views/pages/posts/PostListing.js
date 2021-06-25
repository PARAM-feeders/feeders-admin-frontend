import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Link, useHistory } from "react-router-dom";





const Posts = () => {

  const [posts, setUserPosts] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${apiUrl}/posts`)
        .then(res => res.json())
        .then(
          (result) => {
            // console.log(result)
            setUserPosts(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            console.log(error);
          }
        )
    }
    fetchData();
  }, []);

  return (
    <div className="container" id="post">
      <div className="row justify-content-between mb-4">
        <h2>Posts</h2>
        <Link to="/create-post">  <button className="btn btn-round btn-danger " type="button">
          Create Post
        </button></Link>
      </div>

      <div className="row">
        {posts && posts.map((post, index) => {
          return <Post list={post} ind={index} />
        })}

      </div>


    </div>
  );
};

export default Posts;
