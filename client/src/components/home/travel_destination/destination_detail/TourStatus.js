import React, { Fragment, useContext } from "react";
// import PropTypes from "prop-types";
import { AuthContext } from "./CustomDestinationDetail";
import { Link } from "react-router-dom";
import ActiveStatus from "./ActiveStatus";

const TourStatus = ({ destination }) => {
  const auth = useContext(AuthContext);
  return (
    <Fragment>
      {destination.msg && (
        <h4 style={{ color: "green", textAlign: "center" }}>
          {destination.msg}
        </h4>
      )}

      <div className="contact_join">
        <h3>Contact for join</h3>
        {!auth.loading &&
        auth.isAuthenticated &&
        destination !== null &&
        destination.isActive ? (
          <ActiveStatus auth={auth} destination={destination} />
        ) : (
          <Fragment>
            <p>Only Logged In Users can subscribe...</p>
            <p>
              Click Here to{" "}
              <Link to="/login">
                <span style={{ color: "blue" }}>Log In</span>
              </Link>{" "}
            </p>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

// TourStatus.propTypes = {
//   tour: PropTypes.object.isRequired,
// };

export default TourStatus;
