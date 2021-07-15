import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import AuthService from "../../../utils/AuthService"
import loading from "../../../components/Loading"



const Posts = () => {
  const auth = new AuthService();
  const [posts, setUserPosts] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${apiUrl}/posts`, {
        method: 'get',
        headers: {
          "Content-Type": 'application/json',
          "x-auth-token": auth.getToken()
        }
      })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            if (!result.success) {
              throw (result);
            }
            setUserPosts(result.posts);
          }
        ).catch(err => {
          console.log(err);
        });
    }

    auth.isAuthenticated && fetchData();
  }, []);



  return (
    <div className="container" id="post">
    {loading}
      <div className="row justify-content-between mb-4">
        <h2>My Posts</h2>
        <div>
        <Link to="/create-post">  <button className="btn btn-round btn-danger " type="button">
          Create Post
        </button></Link>
        </div>
      </div>

      <div className="row">
        {posts && posts.length !=0 ? posts.map((post, index) => {
          return <Post list={post} key={index} />
        }) :  "No posts yet"}

      </div>


    </div>
  );
};

export default Posts;
