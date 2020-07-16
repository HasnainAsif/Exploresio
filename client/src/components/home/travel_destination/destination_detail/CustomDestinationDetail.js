import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getSingleDestination,
  getSingleCustomTour,
} from "../../../../actions/customTour";
import Head from "./Head";
import Description from "./Description";
import Spinner from "../../layouts/Spinner";

export const AuthContext = React.createContext();
export const TourIdContext = React.createContext();

const CustomDestinationDetail = ({
  getSingleDestination,
  getSingleCustomTour,
  customTour: { loading, destination, tour },
  auth,
  match,
}) => {
  useEffect(() => {
    getSingleDestination(match.params.tourId, match.params.destId);
  }, [getSingleDestination, match.params.id]);
  useEffect(() => {
    getSingleCustomTour(match.params.tourId);
  }, [getSingleCustomTour, match.params.tourId]);

  return (
    <Fragment>
      {loading || destination === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Head destination={destination} />
          {tour && (
            <AuthContext.Provider value={auth}>
              <TourIdContext.Provider value={tour._id}>
                <Description destination={destination} auth={auth} />
              </TourIdContext.Provider>
            </AuthContext.Provider>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

CustomDestinationDetail.propTypes = {
  getSingleDestination: PropTypes.func.isRequired,
  customTour: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getSingleCustomTour: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  customTour: state.customTour,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getSingleDestination,
  getSingleCustomTour,
})(CustomDestinationDetail);
