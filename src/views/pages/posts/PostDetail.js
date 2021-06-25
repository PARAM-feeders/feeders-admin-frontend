import React, { useEffect, useState } from "react";
import { CIcon } from "@coreui/icons-react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();

  const [postDetails, setUserPostDetails] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${apiUrl}/post/${id}`)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            setUserPostDetails(result);
          },
          (error) => {
            console.log(error);
          }
        )
    }
    fetchData();
  }, []);


  return (
    <div className="container" id="post-detail">
      <div className="row">
        <div className="col-md-6">
          <div className="post-img">
            <img
              src={postDetails?.image}
              alt=""
              width="500"
            />
          </div>
        </div>
        <div className="col-md-6">
          <h4 className="title">{postDetails?.name}</h4>
          <p className="description">
            {postDetails?.description}
          </p>
          <div className="product_meta">
            <p>
              <span>Location: </span>  {postDetails?.location}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostDetail;
