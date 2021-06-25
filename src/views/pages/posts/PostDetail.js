import React from "react";
import { CIcon } from "@coreui/icons-react";

const PostDetail = () => {
  return (
    <div className="container" id="post-detail">
      <div className="row">
        <div className="col-md-6">
          <div className="post-img">
            <img
              src="https://via.placeholder.com/550x380/FFB6C1/000000"
              alt=""
            />
          </div>
        </div>
        <div className="col-md-6">
          <h4 className="title">Title</h4>
          <p className="description">
            Praesent ac condimentum felis. Nulla at nisl orci, at dignissim
            dolor, The best product descriptions address your ideal buyer
            directly and personally. The best product descriptions address your
            ideal buyer directly and personally.
            <ul>
              <li>item1</li>
              <li>item2</li>
              <li>item3</li>
              <li>item4</li>
              <li>item5</li>
            </ul>
          </p>
          <div className="product_meta">
            <p>
              <span>Location: </span> Pinebush, Cambridge
            </p>
          </div>

           {/*<p>
            <button className="btn btn-round btn-danger" type="button">
              Proceed
            </button>
           </p> */}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
