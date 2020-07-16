import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const PopularPlacesItem = ({
  tour: {
    _id,
    travelDate,
    files,
    price,
    destinationName,
    destinationProvince,
    noOfDays,
  },
}) => {
  return (
    <Fragment>
      <div className="col-lg-4 col-md-6">
        <div className="single_place">
          <div className="thumb">
            <img src={files[0].file} alt="" />
            <Link to="#" className="prise">
              Rs:{price}
            </Link>
          </div>
          <div className="place_info">
            <Link to={`/destination_details/${_id}`}>
              <h3>{destinationName}</h3>
            </Link>
            <p>{destinationProvince}</p>
            <div className="rating_days d-flex justify-content-between">
              <div className="d-flex justify-content-center align-items-center">
                Starting at: <Moment format="YYYY/MM/DD">{travelDate}</Moment>
              </div>
              <div className="days">
                <i className="fa fa-clock-o"></i>
                <Link to="#">{noOfDays} Days</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PopularPlacesItem.propTypes = {
  tour: PropTypes.object.isRequired,
};

export default PopularPlacesItem;
