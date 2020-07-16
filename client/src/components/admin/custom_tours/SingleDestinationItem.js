import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "../../../switch.css";
//For Toastr
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Link } from 'react-router-dom'

const SingleDestinationItem = ({
  destination: {
    _id,
    destinationName,
    destinationProvince,
    noOfDays,
    price,
    date,
    joinTour,
  },
}) => {
  return (
    <Fragment>
      <tr>
        <td>
          <ToastContainer />
          {_id}
        </td>
        <td>{destinationName}</td>
        <td>{destinationProvince}</td>
        <td>{noOfDays}</td>
        <td>{price}</td>
        <td>{joinTour.length}</td>
        <td>
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </td>
        {/* <td>
                    <Link to={`/admin$custom_tours$create_destination$${_id}`}>
                    <input type="button" value="Add" className="btn btn-primary" />
                    </Link>
                </td> */}
      </tr>
    </Fragment>
  );
};

SingleDestinationItem.propTypes = {
  destination: PropTypes.object.isRequired,
};

export default SingleDestinationItem;
