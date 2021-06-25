import React from "react";
import { CIcon } from "@coreui/icons-react";

const CreatePost = () => {
  return (
    <div id="create-post">
    <h2>Create Post</h2>
      <form>
        <div className="form-outline mb-4">
          <label className="form-label" for="title">
            Title
          </label>
          <input type="text" id="title" className="form-control" required placeholder="Title"/>
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
          ></textarea>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="location">
            Location
          </label>
          <input type="text" id="location" className="form-control" required placeholder="Location"/>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" for="location">
            Image URL
          </label>
          <input type="text" id="location" className="form-control" required placeholder="Image URL"/>
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

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
