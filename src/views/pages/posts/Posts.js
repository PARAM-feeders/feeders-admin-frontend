import React from "react";
import Post from "./Post";

const Posts = () => {
  return (
    <div className="container" id="post">
      <div className="row justify-content-between mb-4">
      <h2>Posts</h2>
        <button className="btn btn-round btn-danger " type="button">
          Create Post
        </button>
      </div>

        <div className="row justify-content-start">
          <Post />
        </div>

      
    </div>
  );
};

export default Posts;
