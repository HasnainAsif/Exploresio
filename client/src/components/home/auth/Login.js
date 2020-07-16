import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { login } from "../../../actions/auth";
import PropTypes from "prop-types";

const Login = ({
  login,
  auth: { loading, isAuthenticated, user },
  tour,
  customTour,
  history,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  //Redirect if Logged In
  if (
    !loading &&
    isAuthenticated &&
    user !== null &&
    !tour.loading &&
    (tour.tour || customTour.tour)
  ) {
    history.goBack();
  } else if (!loading && isAuthenticated && user !== null && !user.isAdmin) {
    return <Redirect to="/" />;
  } else if (!loading && isAuthenticated && user !== null && user.isAdmin)
    return <Redirect to="/admin" />;

  return (
    <Fragment>
      <div className="container">
        <div className="card card-login mx-auto mt-5">
          <div className="card-header">Login</div>
          <div className="card-body">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  className="form-control"
                  id="exampleInputEmail1"
                  type="email"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => onChange(e)}
                  name="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  className="form-control"
                  id="exampleInputPassword1"
                  type="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  name="password"
                  placeholder="Password"
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="btn btn-primary btn-block"
              />
            </form>
            <div className="text-center">
              <Link className="d-block small mt-3" to="/register">
                Register an Account
              </Link>
              <Link className="d-block small" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
        <br />
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  tour: PropTypes.object.isRequired,
  customTour: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tour: state.tour,
  customTour: state.customTour,
});

export default connect(mapStateToProps, { login })(withRouter(Login));
