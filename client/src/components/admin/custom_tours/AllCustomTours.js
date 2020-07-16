import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layouts/Spinner";
import AllCustomToursItem from "./AllCustomToursItem";
import { getCustomTours } from "../../../actions/customTour";

const AllCustomTours = ({ customTour: { loading, tours }, getCustomTours }) => {
  useEffect(() => {
    getCustomTours();
  }, [getCustomTours]);

  return (
    <Fragment>
      {tours.length === 0 || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h2>All Custom Tours</h2>
          <table className="table table-bordered table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th>Main Dest. Name</th>
                <th>No of Destinations</th>
                <th>Initialize Date</th>
                <th>Home Side View</th>
                <th>Destinations</th>
                <th>Add Destination</th>
              </tr>
            </thead>
            <tbody>
              {tours.length > 0 && (
                <Fragment>
                  {tours.map((tour) => (
                    <AllCustomToursItem key={tour._id} tour={tour} />
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

AllCustomTours.propTypes = {
  customTour: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  customTour: state.customTour,
});

export default connect(mapStateToProps, { getCustomTours })(AllCustomTours);
