import React from "react";
import { CIcon } from '@coreui/icons-react';

const Post = () => {
  return (
            <div className="col-lg-4 mb-4">
              <div className="card">
                <img
                  src="https://images.unsplash.com/photo-1477862096227-3a1bb3b08330?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
                  alt=""
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">Sunset</h5>
                  <p className="card-location">
                  <CIcon name="cil-location-pin" className="icon"/>Pinebush, Cambridge</p>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut
                    eum similique repellat a laborum, rerum voluptates ipsam eos
                    quo tempore iusto dolore modi dolorum in pariatur. Incidunt
                    repellendus praesentium quae!
                  </p>
                  <a href="#/post-details" className="btn btn-outline-success btn-sm">
                    Read More
                  </a>
                </div>
              </div>
            </div>
  );
};

export default Post;
