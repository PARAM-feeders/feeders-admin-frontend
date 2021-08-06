import React from "react";
import about from "../../../assets/icons/about2.jpg";

const About = () => {
  return (
    <div>
  <section className="home-section2">
  <div>
    <img src={about} alt="Feed the need" width="400px" />
  </div>
  <div className="content-wrapper">
    <div className="main-heading">
      <div className="title">About Feed the Need</div>
      <p className="sub-title">
        Feed the Need is a Non Profit Organisation in Ontario, headquartered in Waterloo. Our organisation strives to eliminate hunger by collecting food & essentials donations from hundreds of donars from various locations in the province, which in turn reduces food waste in huge scale and fulfills the daily necessities of the needy. We are continuously working hard and leveraging to multiply our reach.
      </p>
    </div>
    <div>
      <div className="features">
        <div className="content">
          <p className="text">
          We are consistently working with the persistent support from corporates, individual donors, and well-wishers who are helping us to grow from serving tens in the beginning to serving thousands and more.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  </div>
  );
};

export default About;
