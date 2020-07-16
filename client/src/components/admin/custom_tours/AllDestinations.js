import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";
import { getSingleCustomTour } from "../../../actions/customTour";
import AllDestinationsItem from "./AllDestinationsItem";

const AllDestinations = ({
  customTour: { loading, tour },
  getSingleCustomTour,
  match,
}) => {
  useEffect(() => {
    getSingleCustomTour(match.params.id);
  }, [getSingleCustomTour, match.params.id]);

  return (
    <Fragment>
      {tour === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2>All Destinations of {tour.superDestination}</h2>
          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Destination Name</th>
                <th>No Of Days</th>
                <th>price</th>
                <th>Launch Date</th>
                <th>Allow Active</th>
                <th>Admin Side View</th>
                <th>Client Side View</th>
              </tr>
            </thead>
            <tbody>
              {tour !== null && tour.destinations.length > 0 && (
                <Fragment>
                  {tour.destinations.map((destination) => (
                    <AllDestinationsItem
                      key={destination._id}
                      destination={destination}
                      tourId={tour._id}
                    />
                  ))}
                </Fragment>
              )}
            </tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

AllDestinations.propTypes = {
  customTour: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  customTour: state.customTour,
});

export default connect(mapStateToProps, { getSingleCustomTour })(
  AllDestinations
);
