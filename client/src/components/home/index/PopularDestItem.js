import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const PopularDestItem = ({ tour }) => {
  return (
    <Fragment>
      <div className="col-lg-4 col-md-6">
        <div className="single_destination">
          <div className="thumb">
            <img src={`${tour.superFiles[0].file}`} alt="" />
          </div>
          <div className="content">
            <p className="d-flex align-items-center">
              {tour.superDestination}{" "}
              <Link to={`travel_destination/${tour._id}`}>
                {" "}
                {tour.destinations.filter((dest) => dest.isActive).length}{" "}
                Places
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PopularDestItem;
