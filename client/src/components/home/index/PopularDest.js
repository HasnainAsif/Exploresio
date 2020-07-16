import React, { Fragment } from "react";
import PopularDestItem from "./PopularDestItem";
import Spinner from "../layouts/Spinner";
// import PropTypes from 'prop-types'

const PopularDest = ({ customTour: { loading, tours } }) => {
  return (
    <Fragment>
      <div className="popular_destination_area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section_title text-center mb_70">
                <h3>Popular Destination</h3>
                <p>
                  Suffered alteration in some form, by injected humour or good
                  day randomised booth anim 8-bit hella wolf moon beard words.
                </p>
              </div>
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : tours.length > 0 ? (
            <div className="row justify-content-center">
              {tours.map((tour) => (
                <PopularDestItem key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              <h5 style={{ color: "red" }}>
                Due to some reason we are not offering any custom trip at this
                moment
              </h5>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

// PopularDest.propTypes = {

// }

export default PopularDest;
