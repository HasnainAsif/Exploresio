import React, { Fragment } from "react";
import PopularPlacesAreaItem from "./PopularPlacesAreaItem";
import Spinner from "../layouts/Spinner";

const PopularPlacesArea = ({ customTour: { loading, tour } }) => {
  let activeDestinations =
    tour && tour.destinations.filter((dest) => dest.isActive);
  return (
    <Fragment>
      <div className="popular_places_area">
        <div className="container">
          <div className="row justify-content-center">
            {loading ? (
              <Spinner />
            ) : (
              <div className="col-lg-8">
                {tour &&
                  (tour.destinations.length > 0 &&
                  activeDestinations.length > 0 ? (
                    <div className="row">
                      {tour.destinations.map(
                        (destination) =>
                          destination.isActive && (
                            <PopularPlacesAreaItem
                              key={destination._id}
                              destination={destination}
                              tourId={tour._id}
                            />
                          )
                      )}
                    </div>
                  ) : (
                    <p>No Tour Found</p>
                  ))}
                {/* <div className="row">
                <div className="col-lg-12">
                  <div className="more_place_btn text-center">
                    <a className="boxed-btn4" href="#">
                      More Places
                    </a>
                  </div>
                </div>
              </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PopularPlacesArea;
