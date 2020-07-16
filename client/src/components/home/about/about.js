import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import BradcamArea from "./BradcamArea";
import Story from "./Story";
import TravelVariationArea from "../index/TravelVariationArea";
// import PropTypes from 'prop-types'

const about = () => {
  return (
    <Fragment>
      {/* BradCam Area */}
      <BradcamArea />

      {/* Story */}
      <Story />

      <TravelVariationArea />
    </Fragment>
  );
};

// about.propTypes = {

// }

export default withRouter(about);
