import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <li onClick={logout}>
        <Link to="#">Logout</Link>
      </li>
    </Fragment>
  );
  const adminAuthLinks = (
    <Fragment>
      <li onClick={logout}>
        <Link to="#">Logout</Link>
      </li>
      <li>
        <Link to="/admin">Admin</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="col-xl-6 col-lg-6">
      <div className="main-menu  d-none d-lg-block">
        <nav>
          <ul id="navigation">
            <li>
              <Link className="active" to="/">
                home
              </Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {/* <li>
              <Link className="" to="/travel_destination">
                Destination
              </Link>
            </li> */}
            {/* <li><a href="#">pages <i className="ti-angle-down"></i></a>
                            <ul className="submenu">
                                    <li><a href="destination_details.html">Destinations details</a></li>
                                    <li><a href="elements.html">elements</a></li>
                            </ul>
                        </li> */}
            {/* <li><Link to="#">blog <i className="ti-angle-down"></i></Link>
                            <ul className="submenu">
                                <li><Link to="/blog">blog</Link></li>
                                <li><Link to="/single-blog">single-blog</Link></li>
                            </ul>
                        </li> */}
            <li>
              <Link to="/contact-us">Contact</Link>
            </li>

            {!loading && (
              <Fragment>
                {(!isAuthenticated || user === null) && guestLinks}
                {isAuthenticated && user !== null && !user.isAdmin && authLinks}
                {isAuthenticated &&
                  user !== null &&
                  user.isAdmin &&
                  adminAuthLinks}
              </Fragment>
            )}

            {/* <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li onClick = {logout}><Link to="#">Logout</Link></li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
