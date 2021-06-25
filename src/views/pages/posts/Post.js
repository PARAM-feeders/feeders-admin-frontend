import React, { useEffect, useState } from "react";
import { CIcon } from '@coreui/icons-react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useHistory } from "react-router-dom";
const Post = () => {

  // const { user, isAuthenticated, getAccessTokenSilently, getAccessTokenWithPopup, isLoading } =
  //   useAuth0();

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
    <div>
      {posts && posts.map((post, index) => {
        return <div className="col-lg-4 mb-4" key={index}>
          <div className="card">
            <img
              src={post.image}
              alt=""
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{post.name}</h5>
              <p className="card-location">
                <CIcon name="cil-location-pin" className="icon" />{post.location}</p>
              <p className="card-text">
                {post.description}
              </p>
              <Link to={"/post/"+post._id} className="btn btn-outline-success btn-sm">
                Read More
              </Link>
            </div>
          </div>
        </div>
      })}
    </div>
  );
};

export default Post;
