import React, { Fragment } from "react";
// import { Link } from 'react-router-dom'
import PopularPlacesItem from "./PopularPlacesItem";
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PopularPlaces = ({ tour: { loading, tours } }) => {
  let activeTours = tours.filter((tour) => tour.isActive);
  return (
    <Fragment>
      <div className="popular_places_area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="section_title text-center mb_70">
                <h3>Popular Places</h3>
                <p>
                  Suffered alteration in some form, by injected humour or good
                  day randomised booth anim 8-bit hella wolf moon beard words.
                </p>
              </div>
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              {tours.length > 0 && activeTours.length > 0 ? (
                <div className="row justify-content-center">
                  <Fragment>
                    {tours.map(
                      (tour) =>
                        tour.isActive && (
                          <PopularPlacesItem key={tour._id} tour={tour} />
                        )
                    )}
                  </Fragment>
                </div>
              ) : (
                <div className="text-center">
                  <h5 style={{ color: "red" }}>
                    Due to some reason we are not offering any trip at this
                    moment. Create Your own customized trip ...
                  </h5>
                </div>
              )}
            </Fragment>
          )}

          {/* <div className="row">
                        <div className="col-lg-12">
                            <div className="more_place_btn text-center">
                                <Link className="boxed-btn4" to="#">More Places</Link>
                            </div>
                        </div>
                    </div> */}
        </div>
      </div>
    </Fragment>
  );
};

PopularPlaces.propTypes = {
  tour: PropTypes.object.isRequired,
};

export default PopularPlaces;
