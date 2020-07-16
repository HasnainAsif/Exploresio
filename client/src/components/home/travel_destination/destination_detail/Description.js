import React, { Fragment } from "react";
// import PropTypes from "prop-types";
import TourStatus from "./TourStatus";

const Description = ({ destination }) => {
  return (
    <Fragment>
      {destination && (
        <div className="destination_details_info">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-9">
                <div className="destination_info">
                  <h3>Description</h3>
                  <p>{destination.description}</p>
                  {destination.dayDescription.map((daydesp) => (
                    <div key={daydesp._id} className="single_destination">
                      <h4>{daydesp.subject}</h4>
                      <p>{daydesp.body}</p>
                    </div>
                  ))}
                </div>
                <div className="bordered_1px"></div>

                <TourStatus destination={destination} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

// Description.propTypes = {
//   tour: PropTypes.object.isRequired,
// };

export default Description;
