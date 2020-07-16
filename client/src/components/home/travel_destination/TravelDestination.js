import React, { Fragment } from "react";
import BradCamArea from "./BradCamArea";
import PopularPlacesArea from "./PopularPlacesArea";
import { connect } from "react-redux";
import { getSingleCustomTour } from "../../../actions/customTour";
import { useEffect } from "react";

const TravelDestination = ({ customTour, getSingleCustomTour, match }) => {
  useEffect(() => {
    getSingleCustomTour(match.params.id);
  }, [getSingleCustomTour, match.params.id]);

  return (
    <Fragment>
      {/* <!-- bradcam_area  --> */}
      <BradCamArea />

      <PopularPlacesArea customTour={customTour} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  customTour: state.customTour,
});

export default connect(mapStateToProps, { getSingleCustomTour })(
  TravelDestination
);
