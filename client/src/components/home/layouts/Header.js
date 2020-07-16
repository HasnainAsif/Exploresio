import React, { Fragment } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <header>
        <div className="header-area ">
          <div id="sticky-header" className="main-header-area">
            <div className="container-fluid"></div>
            <div className="header_bottom_border">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2">
                  <div className="logo">
                    <Link to="/">
                      <img src="/img/logo.png" alt="" />
                    </Link>
                  </div>
                </div>

                <Navbar />

                <div className="col-xl-4 col-lg-4 d-none d-lg-block">
                  <div className="social_wrap d-flex align-items-center justify-content-end">
                    <div className="number">
                      <p>
                        {" "}
                        <i className="fa fa-phone"></i> 03018107225
                      </p>
                    </div>
                    <div className="social_links d-none d-xl-block">
                      <ul>
                        <li>
                          <Link to="#">
                            {" "}
                            <i
                              className="fa fa-instagram"
                              aria-hidden="true"
                            ></i>{" "}
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            {" "}
                            <i className="fa fa-linkedin"></i>{" "}
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            {" "}
                            <i className="fa fa-facebook"></i>{" "}
                          </Link>
                        </li>
                        <li>
                          <Link to="#">
                            {" "}
                            <i className="fa fa-google-plus"></i>{" "}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="seach_icon">
                  <Link
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    to="#"
                  >
                    <i className="fa fa-search"></i>
                  </Link>
                </div>
                <div className="col-12">
                  <div className="mobile_menu d-block d-lg-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
