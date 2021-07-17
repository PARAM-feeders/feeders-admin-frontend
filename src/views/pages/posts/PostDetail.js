import React, { useEffect, useState } from "react";
import { CIcon } from "@coreui/icons-react";
import { useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from "react-router-dom";
import AuthService from "../../../utils/AuthService";
import { CSpinner } from "@coreui/react";
const PostDetail = () => {
  const auth = new AuthService();
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [postDetails, setUserPostDetails] = useState(null);
  const [userMetadata, setUserMetadata] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {

   
    const fetchData = async () => {
      try {
        const user = await auth.getUserDetails();
        // console.log( user)
        setUserMetadata(user);
        } catch (e) {
          setLoading(false);
          console.log(e);
        }


      await fetch(`${apiUrl}/posts/${id}`, {
        method: 'get',
        headers: {
          "Content-Type": 'application/json',
          "x-auth-token": auth.getToken()
        }
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (!result.success) {
              throw (result);
            }
            setLoading(false);
            setUserPostDetails(result.post);
          }
        ).catch(err => {
          setLoading(false);
          console.log(err);
        });
    };
    fetchData();
  }, []);

  function handleOk() {
    setLoading(true);
    fetch(`${apiUrl}/posts/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": 'application/json',
        "x-auth-token": auth.getToken()
      }
    }).then(
      (result) => {
        console.log(result)
        if (!result.ok) {
          throw (result);
        }
        setLoading(false);
        history.push("/my-posts")
      },
      (error) => {
        setLoading(false);
        console.log(error);
      }
    ).catch(err => {
      setLoading(false);
      console.log(err);
    });

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

  function UpdatePost() {

    return (
      <div>
        <Link to={"/update-post/" + id}>
          <Button variant="danger">
            Update
          </Button>
        </Link>

      </div>
    );
  }

  function OrderNow(){
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

    const handleCancel = () => setShowOrderConfirmation(false);
    const handleShowOrderConfirm = () => setShowOrderConfirmation(true);
    const handleOrder = async () => {
    

      console.log(  "productName", postDetails?.name,
      "description", postDetails?.description,
      "date", Date.now(),
      "post_id", postDetails?._id,
      "postedByName", postDetails?.postedByName,
      "postedByEmail", postDetails?.postedByEmail,
      "buyerName", userMetadata?.name,
      "buyerEmail", userMetadata?.email,
      "orderStatus", true);

      fetch(`${apiUrl}/orders`, {
        method: 'post',
        headers: {
          "Content-Type": 'application/json',
          "x-auth-token": auth.getToken()
        },
        body: JSON.stringify({
          "postedByName": postDetails?.postedByName,
          "postedByEmail": postDetails?.postedByEmail,
          "productName": postDetails?.name,
          "description": postDetails?.description,
          "date": Date.now(),
          "post_id": postDetails?._id,
          "buyerName": userMetadata?.name,
          "buyerEmail": userMetadata?.email,
          "orderStatus": true         
          
        })
      }).then(res => res.json())
        .then(
          (result) => {
            if (!result.success) {
              throw (result);
            }
            history.push("/posts")
          },
          (error) => {
            console.log(error);
          }
        ).catch(err => {
          console.log(err);
        });
    };

    return (
      <div>
          <Button variant="danger" onClick={handleShowOrderConfirm} >
            Order Now
          </Button>


          <Modal show={showOrderConfirmation} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Order Now</Modal.Title>
          </Modal.Header>
          <Modal.Body>Confirm the order?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              No
            </Button>
            <Button variant="primary" onClick={handleOrder}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
         </div>
    )
  }



  return (
    <div className="container" id="post-detail">
      <div className="row justify-content-end mb-4">
        {postDetails && postDetails.user_id == localStorage.getItem("id") &&
          <UpdatePost />}
        &nbsp;
        {postDetails && postDetails.user_id == localStorage.getItem("id") &&
          <DeletePost />}

      </div>
      {loading ? <div class="text-center w-100 h50 d-flex align-items-center justify-content-center"><CSpinner /> </div> : <div className="row">
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
              {postDetails?.location && <span>Location: </span>} {postDetails?.location}
            </p>
            {postDetails && postDetails.user_id != localStorage.getItem("id") &&
              <p>
                <span>Posted by: </span> {postDetails?.postedByName}
              </p>
            }
            {postDetails && postDetails.user_id != localStorage.getItem("id") &&
              <p>
                <span>Email: </span> {postDetails?.postedByEmail}
              </p>
            }
            {postDetails && postDetails.user_id != localStorage.getItem("id") &&
              <p>
              <OrderNow />
              </p>
            }
          </div>
        </div>
      </div>}

    </div>
  );
};

export default PostDetail;
