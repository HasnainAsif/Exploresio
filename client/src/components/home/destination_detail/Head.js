import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Head = ({ tour }) => {
  return (
    <Fragment>
      {tour && (
        <div
          className="destination_banner_wrap overlay"
          style={{ backgroundImage: `url(/${tour.files[0]?.file})` }}
        >
          <div className="destination_text text-center">
            <div>
              <Fragment>
                <h3>{tour.destinationName}</h3>
                <p>{tour.destinationSlogan}</p>
              </Fragment>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Head.propTypes = {
  tour: PropTypes.object.isRequired,
};

export default Head;
