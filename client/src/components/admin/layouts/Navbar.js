import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import SideNav from "./SideNav";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

const Navbar = ({ logout, history }) => {
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };
  const show = nav ? "show" : "";

  const loggedout = (e) => {
    logout();
    history.push("/");
  };

  return (
    <Fragment>
      {/* Navigation */}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        id="mainNav"
      >
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          onClick={toggleNav}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={"collapse navbar-collapse " + show}
          id="navbarResponsive"
        >
          <SideNav />

          <ul className="navbar-nav sidenav-toggler">
            <li className="nav-item">
              <Link className="nav-link text-center" id="sidenavToggler" to="#">
                <i className="fa fa-fw fa-angle-left"></i>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item">
                    <form className="form-inline my-2 my-lg-0 mr-lg-2">
                        <div className="input-group">
                        <input className="form-control" type="text" placeholder="Search for..."/>
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="button">
                            <i className="fa fa-search"></i>
                            </button>
                        </span>
                        </div>
                    </form>
                    </li> */}
            <li className="nav-item">
              <Link
                className="nav-link"
                onClick={(e) => loggedout(e)}
                data-target="#exampleModal"
                to="#"
              >
                <i className="fa fa-fw fa-sign-out"></i>Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(withRouter(Navbar));
