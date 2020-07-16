import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import HomeSlider from "./HomeSlider";
import PopularDest from "./PopularDest";
import Newsletter from "./Newsletter";
import { connect } from "react-redux";
import { getHomeTours } from "../../../actions/tour";
import { getCustomTours } from "../../../actions/customTour";
import PopularPlaces from "./PopularPlaces";
import CurrentTrips from "./CurrentTrips";
import RecentTrips from "./RecentTrips";
import TravelVariationArea from "./TravelVariationArea";
// import HomeSlider2 from './HomeSlider2'

const Home = ({ getHomeTours, tour, customTour, getCustomTours }) => {
  useEffect(() => {
    getHomeTours();
    getCustomTours();
  }, [getHomeTours, getCustomTours]);

  return (
    <Fragment>
      {/* <HomeSlider2/> */}
      <HomeSlider />

      {/* popular_destination_area_start */}
      <PopularDest customTour={customTour} />

      {/* Newsletter_Area_Start */}
      <Newsletter />

      {/* popular_places_area_start */}
      <PopularPlaces tour={tour} />

      <TravelVariationArea />

      {/* current_tours_area_start */}
      <CurrentTrips tour={tour} />

      {/* current_tours_area_start */}
      <RecentTrips tour={tour} />
    </Fragment>
  );
};

Home.propTypes = {
  getHomeTours: PropTypes.func.isRequired,
  getCustomTours: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tour: state.tour,
  customTour: state.customTour,
});

export default connect(mapStateToProps, { getHomeTours, getCustomTours })(Home);
