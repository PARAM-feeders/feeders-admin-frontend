import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import AuthService from "../../../utils/AuthService"
import loading from "../../../components/Loading"
import { CSpinner } from "@coreui/react";



const Posts = () => {
  const auth = new AuthService();
  const [posts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${apiUrl}/posts/all`, {
        method: 'get',
        headers: {
          "Content-Type": 'application/json',
          "x-auth-token": auth.getToken()
        }
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (!result.success) {
              throw (result);
            }
            setLoading(false);
            setUserPosts(result.posts);
          }
        ).catch(err => {
          setLoading(false);
          console.log(err);
        });
    }

    auth.isAuthenticated && fetchData();
  }, []);



  return (
    <div className="container" id="post">

      <div className="row justify-content-between mb-4">
        <h2>All Approved Posts</h2>
        <div>
        <Link to="/my-posts">  <button className="btn btn-round btn-danger " type="button">
          My Posts
        </button></Link>
        <Link to="/create-post">  <button className="btn btn-round btn-danger " type="button">
          Create Post
        </button></Link>
        </div>
      </div>

      { loading ? <div class="text-center w-100 h50 d-flex align-items-center justify-content-center"><CSpinner /> </div>:
      <div className="row">
        {posts && posts.map((post, index) => {
          return <Post list={post} key={index} />
        })}
      </div>

    }

    </div>
  );
};

export default Posts;
