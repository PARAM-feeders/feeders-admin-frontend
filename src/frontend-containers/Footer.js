import React from "react";
import logo from "../assets/icons/logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="bg-light text-center text-lg-start">
        <div class="logo-border pb-50 mb-70">
          <div class="row">
            <div class="col-xl-12">
              <div class="bottom-logo text-center">
                <a href="/#">
                <img src={logo} alt="logo" width="42px"/>Feed the Need
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="text-center copyright"
        >
           Copyright © 2021. Powered By Conestoga Students
        </div>
      </footer>
    </div>
  );
};

export default Footer;
