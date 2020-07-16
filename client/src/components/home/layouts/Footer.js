import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'

const Footer = (props) => {
  return (
    <Fragment>
      <footer className="footer">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-md-6 col-lg-4 ">
                <div className="footer_widget">
                  <div className="footer_logo">
                    <Link to="#">
                      <img src="/img/footer_logo.png" alt="" />
                    </Link>
                  </div>
                  <p>
                    I Hall UET Taxila <br /> Taxila Rawalpindi <br />
                    <Link to="#">+923321770056</Link> <br />
                    <Link to="#">hussnainasif173@gmail.com</Link>
                  </p>
                  <div className="socail_links">
                    <ul>
                      <li>
                        <Link to="#">
                          <i className="ti-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="ti-twitter-alt"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="fa fa-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="fa fa-pinterest"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="fa fa-youtube-play"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-2">
                <div className="footer_widget">
                  <h3 className="footer_title">Company</h3>
                  <ul className="links">
                    <li>
                      <Link to="#">Pricing</Link>
                    </li>
                    <li>
                      <Link to="#">About</Link>
                    </li>
                    <li>
                      <Link to="#"> Gallery</Link>
                    </li>
                    <li>
                      <Link to="#"> Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-lg-3">
                <div className="footer_widget">
                  <h3 className="footer_title">Popular destination</h3>
                  <ul className="links double_links">
                    <li>
                      <Link to="#">Areng Kel</Link>
                    </li>
                    <li>
                      <Link to="#">Shardah</Link>
                    </li>
                    <li>
                      <Link to="#">Murree</Link>
                    </li>
                    <li>
                      <Link to="#">Sawat</Link>
                    </li>
                    <li>
                      <Link to="#">Kalam</Link>
                    </li>
                    <li>
                      <Link to="#">Naran</Link>
                    </li>
                    <li>
                      <Link to="#">Kaghan</Link>
                    </li>
                    <li>
                      <Link to="#">Pathriata</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-lg-3">
                <div className="footer_widget">
                  <h3 className="footer_title">Instagram</h3>
                  <div className="instagram_feed">
                    <div className="single_insta">
                      <Link to="#">
                        <img src="/img/instagram/1.png" alt="" />
                      </Link>
                    </div>
                    <div className="single_insta">
                      <Link to="#">
                        <img src="/img/instagram/2.png" alt="" />
                      </Link>
                    </div>
                    <div className="single_insta">
                      <Link to="#">
                        <img src="/img/instagram/3.png" alt="" />
                      </Link>
                    </div>
                    <div className="single_insta">
                      <Link to="#">
                        <img src="/img/instagram/4.png" alt="" />
                      </Link>
                    </div>
                    <div className="single_insta">
                      <Link to="#">
                        <img src="/img/instagram/5.png" alt="" />
                      </Link>
                    </div>
                    <div className="single_insta">
                      <Link to="#">
                        <img src="/img/instagram/6.png" alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copy-right_text">
          <div className="container">
            <div className="footer_border"></div>
            <div className="row">
              <div className="col-xl-12">
                <p className="copy_right text-center">
                  {/*Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright &copy; All rights reserved | From Exploresio Team
                  {/* <i className="fa fa-heart-o" aria-hidden="true"></i> by <Link to="https://colorlib.com" target="_blank">Colorlib</Link> */}
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

// Footer.propTypes = {

// }

export default Footer;
