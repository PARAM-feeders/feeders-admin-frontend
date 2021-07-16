import React, { useEffect, useState } from "react";
import { CIcon } from "@coreui/icons-react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthService from "../../../utils/AuthService"


const CreatePost = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocations] = useState("");
  const [description, setDescription] = useState("");
  const [userMetaData, setUserMetadata] = useState([]);
  const auth = new AuthService();
  const apiUrl = process.env.REACT_APP_API_URL;
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {

      try {
        const user = await auth.getUserDetails();
        setUserMetadata(user);
      } catch (e) {
        console.log(e);
      }

      if (id != undefined) {
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
              setName(result.post.name);
              setImage(result.post.image);
              setLocations(result.post.location);
              setDescription(result.post.description);
            }
          ).catch(err => {
            console.log(err);
          });
      }
    };
    fetchData();
  }, []);

  function SaveForm() {
    console.log(name, image, description, location)
    fetch(`${apiUrl}/posts`, {
      method: 'post',
      headers: {
        "Content-Type": 'application/json',
        "x-auth-token": auth.getToken()
      },
      body: JSON.stringify({
        "name": name,
        "description": description,
        "image": image,
        "location": location,
        "postBy": userMetaData.name,
        "email": userMetaData.email
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

  }



  function UpdateForm() {
    fetch(`${apiUrl}/posts/${id}`, {
      method: 'put',
      headers: {
        "Content-Type": 'application/json',
        "x-auth-token": auth.getToken()
      },
      body: JSON.stringify({
        "name": name,
        "description": description,
        "image": image,
        "location": location
      })
    }).then(res => res.json())
      .then(
        (result) => {
          if (!result.success) {
            throw (result);
          }
          history.push("/my-posts")
        },
        (error) => {
          console.log(error);
        }
      ).catch(err => {
        console.log(err);
      });

  }

  return (
    <div id="create-post">
      <h2>{id && id ? "Update Post" : "Create Post"}</h2>
      <form>
        <div className="form-outline mb-4">
          <label className="form-label" for="title">
            Title
          </label>
          <input type="text" id="title" className="form-control" value={name} required placeholder="Title" onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="description">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="4"
            required
            placeholder="Description.."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="location">
            Location
          </label>
          <input type="text" id="location" className="form-control" value={location} required onChange={(e) => setLocations(e.target.value)} placeholder="Location" />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="location">
            Image URL
          </label>
          <input type="text" id="location" className="form-control" value={image} required placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
        </div>

        {/* <div class="form-outline mb-4">
          <label for="upload-img">Example file input</label>
          <input
            type="file"
            class="form-control-file"
            id="upload-img"
            required
          />
        </div>*/}
        {id && id ?
          <button type="submit" className="btn btn-primary btn-block mb-4" onClick={() => UpdateForm()}>
            Update
          </button>
          :
          <button type="submit" className="btn btn-primary btn-block mb-4" onClick={() => SaveForm()}>
            Submit
          </button>}
      </form>
    </div>
  );
};

export default CreatePost;
