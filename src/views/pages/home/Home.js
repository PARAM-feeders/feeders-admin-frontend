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
            <h5>Looking For Help?</h5>
            <p>Immunity Builders | Masks | Cooked Meals | Grocery Kits</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slider2}
            alt="First slide"
          />
          <Carousel.Caption className="second-slide">
            <h5>Let's Stand By Those In NEED</h5>
            <p>Help by Donating Food and Daily Essentials.</p>
          </Carousel.Caption>
        </Carousel.Item>
       
      </Carousel>
      <section className="home-section2">
        <div>
          <img src={girlWithFood} alt="Feed the need" width="400px" />
        </div>
        <div className="content-wrapper">
          <div className="main-heading">
            <div className="title">FOOD RELIEF</div>
            <p className="sub-title">
            At this great hour of need, Feed the Need, in close coordination with local supporters & donars, has stepped in to provide relief by providing food to many across Ontario.
            </p>
          </div>
          <div>
            <div className="features">
              <div>
                <img src={icon1} alt="Banana Icon" />
              </div>
              <div className="content">
                <p className="title">Fruits and Veggies</p>
                <p className="text">
                Hundreds of thousands of us rely on Fruits & Veggies for a fact that eating the rainbow of veggies and fruits can help us stay healthier and fight off diseases. We can make this site a vital source for our fruit and vegetable donations...
                </p>
              </div>
            </div>
            <div className="features">
              <div>
                <img src={icon2} alt="Milk Icon" />
              </div>
              <div className="content">
                <p className="title">Dairy Products</p>
                <p className="text">
                  We all know that the Milk products contain a number of substances that our body needs ‒ calcium, protein, fat, potassium, vitamins A, B, B12 and D, zinc, etc. Let's help the needy by donating such Nutritious and Mineral rich food.
                </p>
              </div>
            </div>
            <div className="features">
              <div>
                <img src={icon3} alt="Vegetable Icon" />
              </div>
              <div className="content">
                <p className="title">Other Daily Essentials</p>
                <p className="text">
                  You can also donate other daily essentials alongside food.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-section">
        <div className="title">Stretch Your Helping Hand</div>
        <p>
        Join us to Feed the Need, add goodwill to your special occasions by spreading joy among those who need your care and support the most. Every $1 donated approximately equals 2 meals, or you can donate a meal or groceries too! Donate Now.
        </p>
      </section>

      <section className="testimonial">
        <div className="carousel">
          <div className="heading">
            <img src={thumbsup} alt="testimonial" />
            <h1>Impact Stories</h1>
            <p className="sub-heading">
              We hear from our valuable Donars and Donar Recipients.
            </p>
          </div>
          <Carousel variant="dark" interval={3000} pause={false} touch={true}>
            <Carousel.Item>
            <div className="client-wrapper">
              <div className="client-text">
                <p>
                "We thank Feed The Need for creating this wonderful platform that we could trust, to provide food to the needy. We are very impressed with the process, transparency and clarity the Foundation has exhibited."
                </p>
                <h4>An Anonymous Donor</h4>
                <span>Waterloo, ON.</span>
              </div>
              <div className="client-img">
                <img
                  src={"https://img-premium.flaticon.com/png/512/1165/premium/1165674.png?token=exp=1628037988~hmac=71b9675a733cc5012155df786009cf8e"}
                  alt="Anonymous Donor"
                  width="50px"
                />
              </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="client-wrapper">
              <div className="client-text">
                <p>
                “I had lost hope. I was worried; my sons were sleeping on an empty stomach daily.” - He is thankful to God for having shown him the path towards Feed the Need’s relief team.
                </p>
                <h4>An Anonymous Donor Recipient</h4>
                <span>Cambridge, ON.</span>
              </div>
              <div className="client-img">
                <img
                  src={"https://img-premium.flaticon.com/png/512/2102/premium/2102647.png?token=exp=1628037850~hmac=10cca7789b573ad463365cf6684f0acf"}
                  alt="Anonymous Donor Recipient"
                  width="50px"
                />
              </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
            <div className="client-wrapper">
              <div className="client-text">
                <p>
                  "I love the way how this organization is helping two kinds of people at the same time, Donors can donate the excess food or groceries and help Donor Recipients, and reduce food wastage!"
                </p>
                <h4>Ashwin</h4>
                <span>Waterloo, ON.</span>
              </div>
              <div className="client-img">
                <img
                  src={test1}
                  alt="Ashwin's Image"
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
