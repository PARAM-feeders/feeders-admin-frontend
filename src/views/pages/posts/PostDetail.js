import React, { useEffect, useState } from "react";
import { CIcon } from "@coreui/icons-react";
import { useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  console.log("id", id);

  const [postDetails, setUserPostDetails] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${apiUrl}/post/${id}`)
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            setUserPostDetails(result);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    fetchData();
  }, []);

  function handleOk(){

    fetch(`${apiUrl}/post/${id}`, {
      method: 'delete'
    }).then(
      (result) => {
       history.push("/posts")
      },
      (error) => {
        console.log(error);
      }
    );
      
}

  function DeletePost() {

  
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <div>
        <Button variant="danger" onClick={handleShow}>
          Delete
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={handleOk}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }



  return (
    <div className="container" id="post-detail">
      <div className="row justify-content-end mb-4">
        <DeletePost />
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="post-img">
            <img src={postDetails?.image} alt="" width="500" />
          </div>
        </div>
        <div className="col-md-6">
          <h4 className="title">{postDetails?.name}</h4>
          <p className="description">{postDetails?.description}</p>
          <div className="product_meta">
            <p>
              <span>Location: </span> {postDetails?.location}
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default PostDetail;
