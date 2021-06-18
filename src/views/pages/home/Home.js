import React from "react";
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  return <div>
    <Carousel variant="dark" interval={3000} pause={false} touch={true}>
      <Carousel.Item >
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/rajith/image/upload/v1623991467/feed%20the%20need/pexels-carlo-martin-alcordo-2449665_zue9ek.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item >
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/rajith/image/upload/v1623991467/feed%20the%20need/pexels-matheus-cenali-2733918_q01fjj.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/rajith/image/upload/v1623991467/feed%20the%20need/pexels-daria-shevtsova-709817_yvgr4d.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <section className="h150">
      <h1>Welcome</h1>
    </section>
  </div>;
};

export default Home;
