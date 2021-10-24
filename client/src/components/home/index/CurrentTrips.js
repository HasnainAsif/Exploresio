import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import Moment from "react-moment";

const CurrentTrips = ({ tour: { loading, tours } }) => {
  let currentTours = tours.filter((tour) => tour.isCurrent);
  return (
    <Fragment>
      <div className="recent_trip_area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section_title text-center mb_70">
                <h3>Currently Progress Trips</h3>
              </div>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              {tours.length > 0 && currentTours.length > 0 ? (
                <div className="row justify-content-center">
                  {tours.map(
                    (tour) =>
                      tour.isCurrent && (
                        <div className="col-lg-4 col-md-6" key={tour._id}>
                          <div className="single_trip">
                            <div className="thumb">
                              <img src={tour.files[0]?.file} alt="" />
                            </div>
                            <div className="info">
                              <div className="date">
                                <span>
                                  Travel Date:{" "}
                                  <Moment format="YYYY/MM/DD">
                                    {tour.travelDate}
                                  </Moment>
                                </span>
                              </div>
                              <Link to={`/destination_details/${tour._id}`}>
                                <h3>{tour.destinationName}</h3>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <h5 style={{ color: "red" }}>
                    No Tour is Currently in Progress
                  </h5>
                </div>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

CurrentTrips.propTypes = {
  tour: PropTypes.object.isRequired,
};

export default CurrentTrips;
