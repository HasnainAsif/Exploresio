import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const PopularPlacesAreaItem = ({
  destination: {
    _id,
    destinationName,
    destinationProvince,
    price,
    files,
    date,
    noOfDays,
  },
  tourId,
}) => {
  return (
    <Fragment>
      <div className="col-lg-6 col-md-6">
        <div className="single_place">
          <div className="thumb">
            <img src={`/${files[0].file}`} alt="" />
            <a href="#" className="prise">
              Rs:{price} for 2
            </a>
          </div>
          <div className="place_info">
            <Link to={`/destination_details$${tourId}$${_id}`}>
              <h3>{destinationName}</h3>
            </Link>
            <p>{destinationProvince}</p>
            <div className="rating_days d-flex justify-content-between">
              <div className="d-flex justify-content-center align-items-center">
                Created at: <Moment format="YYYY/MM/DD">{date}</Moment>
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

export default PopularPlacesAreaItem;
