import React from "react";
import Carousel from "react-bootstrap/Carousel";
import icon1 from "../../../assets/icons/f1.png";
import icon2 from "../../../assets/icons/f2.png";
import icon3 from "../../../assets/icons/f3.png";
import girlWithFood from "../../../assets/icons/girl.png";
import thumbsup from "../../../assets/icons/icon6.png";
import test1 from "../../../assets/icons/test1.png";
import slider1 from "../../../assets/icons/slider1.jpg";
import slider2 from "../../../assets/icons/slider2.jpg";

const Home = () => {
  return (
    <div>
      <Carousel variant="dark" interval={3000} pause={false} touch={true}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slider1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slider2}
            alt="First slide"
          />
          <Carousel.Caption className="second-slide">
            <h5>Second slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
       
      </Carousel>
      <section className="home-section2">
        <div>
          <img src={girlWithFood} alt="Feed the need" width="400px" />
        </div>
        <div className="content-wrapper">
          <div className="main-heading">
            <div className="title">Title</div>
            <p className="sub-title">
              Lorem ipsum dolor sit amet, consectetur adipisicing sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua enim minim.
            </p>
          </div>
          <div>
            <div className="features">
              <div>
                <img src={icon1} alt="" />
              </div>
              <div className="content">
                <p className="title">Natural Foods</p>
                <p className="text">
                  Lorem ipsum dolor conse ctetur adipisicing elit sed do eiusmo
                  temincididunt labore apericons.
                </p>
              </div>
            </div>
            <div className="features">
              <div>
                <img src={icon2} alt="" />
              </div>
              <div className="content">
                <p className="title">Natural Foods</p>
                <p className="text">
                  Lorem ipsum dolor conse ctetur adipisicing elit sed do eiusmo
                  temincididunt labore apericons.
                </p>
              </div>
            </div>
            <div className="features">
              <div>
                <img src={icon3} alt="" />
              </div>
              <div className="content">
                <p className="title">Natural Foods</p>
                <p className="text">
                  Lorem ipsum dolor conse ctetur adipisicing elit sed do eiusmo
                  temincididunt labore apericons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-section">
        <div className="title">Title</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua enim minim.
        </p>
      </section>

      <section className="testimonial">
        <div className="carousel">
          <div className="heading">
            <img src={thumbsup} alt="testimonial" />
            <h1>Client’s Say</h1>
            <p className="sub-heading">
              Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
              eiusmotempor incididunt labore dolore magna aliqua minim veniam
            </p>
          </div>
          <Carousel variant="dark" interval={3000} pause={false} touch={true}>
            <Carousel.Item>
            <div className="client-wrapper">
              <div className="client-text">
                <p>
                  Borem ipsum dolor sit amet consectetur adipisic ing elit sed
                  do eiusmod tempor incididunt ut labore et dolore magaliqu enim
                  ainim veniam.
                </p>
                <h4>Johnny J. Stewart</h4>
                <span>Cambridge</span>
              </div>
              <div className="client-img">
                <img
                  src={test1}
                  alt="client"
                />
              </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="client-wrapper">
              <div className="client-text">
                <p>
                  Borem ipsum dolor sit amet consectetur adipisic ing elit sed
                  do eiusmod tempor incididunt ut labore et dolore magaliqu enim
                  ainim veniam.
                </p>
                <h4>Johnny J. Stewart</h4>
                <span>Cambridge</span>
              </div>
              <div className="client-img">
                <img
                  src={test1}
                  alt="client"
                />
              </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="client-wrapper">
              <div className="client-text">
                <p>
                  Borem ipsum dolor sit amet consectetur adipisic ing elit sed
                  do eiusmod tempor incididunt ut labore et dolore magaliqu enim
                  ainim veniam.
                </p>
                <h4>Johnny J. Stewart</h4>
                <span>Cambridge</span>
              </div>
              <div className="client-img">
                <img
                  src={test1}
                  alt="client"
                />
              </div>
              </div>
            </Carousel.Item>
           
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Home;
