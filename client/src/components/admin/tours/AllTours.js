import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AllToursItem from "./AllToursItem";
import Spinner from "../layouts/Spinner";
import { getTours } from "../../../actions/tour";

const AllTours = ({ getTours, tour: { loading, tours } }) => {
  useEffect(() => {
    getTours();
  }, [getTours]);

  return (
    <Fragment>
      {tours === [] || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2>All Tours</h2>
          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Dest. Name</th>
                <th>Days to Travel</th>
                <th>Price</th>
                <th>Launch Date</th>
                <th>Travel Date</th>
                <th>Allow Active</th>
                <th>Allow Current</th>
                <th>Allow Finished</th>
                <th>Home Side</th>
                <th>Admin Side</th>
              </tr>
            </thead>
            <tbody>
              {tours.length > 0 && (
                <Fragment>
                  {tours.map((tour) => (
                    <AllToursItem key={tour._id} tour={tour} />
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

AllTours.propTypes = {
  getTours: PropTypes.func.isRequired,
  tour: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tour: state.tour,
});

export default connect(mapStateToProps, { getTours })(AllTours);
