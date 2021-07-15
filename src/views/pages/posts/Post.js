import { CIcon } from '@coreui/icons-react';
import {
  CBadge
} from '@coreui/react';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Post = props => {
  const [post, setUserPosts] = useState(null);

  useEffect(() => {
    setUserPosts(props && props);
  }, []);

  return (
    <div className="col-lg-4 mb-4" key={post?.ind}>
      <div className="card">
        <img
          src={post?.list.image}
          alt=""
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{post?.list.name} &nbsp;
           {post?.showApproved && 
         ( post?.list.isApproved ?  <CBadge color="success">Approved</CBadge> :  <CBadge color="danger">Not Approved</CBadge>)}</h5>
          <p className="card-location">
            <CIcon name="cil-location-pin" className="icon" />{post?.list.location}</p>
          <p className="card-text">
            {post?.list.description}
          </p>
          
          <Link to={"/post/" + post?.list._id} className="btn btn-outline-success btn-sm">
            Read More
          </Link>
        </div>
      </div>
    </div>

  );
};

export default Post;
