import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";
import { getSingleDestination } from "../../../actions/customTour";
import SingleDestinationItem from "./SingleDestinationItem";
import { useState } from "react";
import SingleDestItem from "./SingleDestItem";

const SingleDestination = ({
  customTour: { loading, destination, tour },
  getSingleDestination,
  match,
}) => {
  const [tourId, setTourId] = useState("");
  useEffect(() => {
    getSingleDestination(match.params.tourId, match.params.destId);
    setTourId(match.params.tourId);
  }, [getSingleDestination, match.params.tourId, match.params.destId]);

  return (
    <Fragment>
      {loading || destination === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2>{destination.destinationName}</h2>
          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Destination Name</th>
                <th>Destination Province</th>
                <th>No Of Days</th>
                <th>price</th>
                <th>No Of Subscribers</th>
                <th>Launch Date</th>
                <th>Home Side View</th>
              </tr>
            </thead>
            <tbody>
              {destination !== null && (
                <SingleDestinationItem destination={destination} />
              )}
            </tbody>
          </table>

          {destination !== null && destination.joinTour.length > 0 && (
            <div className="body2">
              <div className="all-boxes">
                {destination.joinTour.map((joining) => (
                  <SingleDestItem
                    key={joining._id}
                    joining={joining}
                    tourId={tourId}
                    destId={destination._id}
                  />
                ))}
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

SingleDestination.propTypes = {
  customTour: PropTypes.object.isRequired,
  getSingleDestination: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  customTour: state.customTour,
});

export default connect(mapStateToProps, { getSingleDestination })(
  SingleDestination
);
