import React, { Fragment } from "react";

const ContactSection = () => {
  return (
    <Fragment>
      <section class="contact-section">
        <div className="container">
          <div class="row justify-content-center">
            <div class="col-12">
              <h2 class="contact-title">Get in Touch</h2>
            </div>
            <div class="col-12">
              <img
                src="/img/map.png"
                style={{ width: "100%", height: "100%" }}
                alt="Office Location"
              />
            </div>
            <div class="col-lg-3 mt-5">
              <div class="media contact-info">
                <span class="contact-info__icon">
                  <i class="ti-home"></i>
                </span>
                <div class="media-body">
                  <h3>Buttonwood, California.</h3>
                  <p>Rosemead, CA 91770</p>
                </div>
              </div>
              <div class="media contact-info">
                <span class="contact-info__icon">
                  <i class="ti-tablet"></i>
                </span>
                <div class="media-body">
                  <h3>+1 253 565 2365</h3>
                  <p>Mon to Fri 9am to 6pm</p>
                </div>
              </div>
              <div class="media contact-info">
                <span class="contact-info__icon">
                  <i class="ti-email"></i>
                </span>
                <div class="media-body">
                  <h3>support@colorlib.com</h3>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ContactSection;
