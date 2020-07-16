import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Head = ({ destination }) => {
  return (
    <Fragment>
      {destination && (
        <div
          className="destination_banner_wrap overlay"
          style={{ backgroundImage: `url(/${destination.files[1].file})` }}
        >
          <div className="destination_text text-center">
            <div>
              <Fragment>
                <h3>{destination.destinationName}</h3>
                <p>{destination.destinationSlogan}</p>
              </Fragment>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Head.propTypes = {
  destination: PropTypes.object.isRequired,
};

export default Head;
