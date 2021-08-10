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
  const [postImage, setPostImage] = useState('')
  const [postImagePreview, setPostImagePreview] = useState('https://res.cloudinary.com/rajith/image/upload/v1628569856/feed%20the%20need/download_rellxk.png')

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

  const SaveForm = () => {
    fetch(`${apiUrl}/posts`, {
      method: 'post',
      headers: {
        "Content-Type": 'application/json',
        "x-auth-token": auth.getToken()
      },
      body: JSON.stringify({
        "name": name,
        "description": description,
        "image": postImage,
        "location": location,
        "postedByName": userMetaData.name,
        "postedByEmail": userMetaData.email
      })
    }).then(res => res.json())
      .then(
        (result) => {
          // if (!result.success) {
          //   throw (result);
          // }
          history.push("/posts")
        },
        (error) => {
          console.log(error);
        }
      ).catch(err => {
        console.log(err);
      });

  }



  const UpdateForm = () => {
    fetch(`${apiUrl}/posts/${id}`, {
      method: 'put',
      headers: {
        "Content-Type": 'application/json',
        "x-auth-token": auth.getToken()
      },
      body: JSON.stringify({
        "name": name,
        "description": description,
        "image": postImage,
        "location": location
      })
    }).then(res => res.json())
      .then(
        (result) => {
          // if (!result.success) {
          //   throw (result);
          // }
          history.push("/my-posts")
        },
        (error) => {
          console.log(error);
        }
      ).catch(err => {
        console.log(err);
      });

  }


  const onChange = e => {

        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setPostImagePreview(reader.result)
                setPostImage(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])

    
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

        {/* <div className="form-outline mb-4">
          <label className="form-label" for="location">
            Image URL
          </label>
          <input type="text" id="location" className="form-control" value={image} required placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
        </div> */}



        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Image</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='postImage mr-3 item-rtl'>
                                        <img
                                            src={postImagePreview}
                                            className='rounded-circle'
                                            alt='Post Preview'
                                            width= "80"
                                            height = "80"
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='postImage'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Image
                                    </label>
                                </div>
                            </div>
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
          <button type="submit" className="btn green-btn btn-block mb-4" onClick={() => UpdateForm()}>
            Update
          </button>
          :
          <button type="submit" className="btn green-btn btn-block mb-4" onClick={() => SaveForm()}>
            Submit
          </button>}
      </form>
    </div>
  );
};

export default CreatePost;
