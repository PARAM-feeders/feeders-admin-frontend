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
      <div className="title">About Us</div>
      <p className="sub-title">
        Lorem ipsum dolor sit amet, consectetur adipisicing sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua enim minim.
      </p>
    </div>
    <div>
      <div className="features">
        <div className="content">
          <p className="text">
            Lorem ipsum dolor conse ctetur adipisicing elit sed do eiusmo
            temincididunt labore apericons.Lorem ipsum dolor conse ctetur adipisicing elit sed do eiusmo temincididunt labore apericons.
            Lorem ipsum dolor conse ctetur adipisicing elit sed do eiusmo
            temincididunt labore apericons.
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
