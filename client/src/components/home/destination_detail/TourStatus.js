import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./DestinationDetail";
import { Link } from "react-router-dom";
import CurrentStatus from "./CurrentStatus";
import FinishedStatus from "./FinishedStatus";
import ActiveStatus from "./ActiveStatus";

const TourStatus = ({ tour }) => {
  const auth = useContext(AuthContext);
  return (
    <Fragment>
      {tour !== null && tour.isCurrent ? (
        <CurrentStatus />
      ) : tour !== null && tour.isFinished ? (
        <FinishedStatus />
      ) : tour !== null && tour.isActive ? (
        <Fragment>
          {tour.msg && (
            <h4 style={{ color: "green", textAlign: "center" }}>{tour.msg}</h4>
          )}

          <div className="contact_join">
            <h3>Contact for join</h3>
            {!auth.loading &&
            auth.isAuthenticated &&
            tour !== null &&
            tour.isActive ? (
              <ActiveStatus auth={auth} tour={tour} />
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
      ) : (
        <p>Admin has not yet assigned any state to this tour</p>
      )}
    </Fragment>
  );
};

TourStatus.propTypes = {
  tour: PropTypes.object.isRequired,
};

export default TourStatus;
