import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "../../../switch.css";
import { connect } from "react-redux";
//For Toastr
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import {
  deleteDestination,
  updateDestinationActive,
} from "../../../actions/customTour";

const AllDestinationsItem = ({
  tourId,
  destination: { _id, destinationName, noOfDays, price, date, isActive },
  deleteDestination,
  updateDestinationActive,
}) => {
  const [allowActive, setAllowActive] = useState(isActive);

  const onActiveChange = (e) => {
    setAllowActive(!allowActive);
    updateDestinationActive(tourId, _id, !allowActive);
    //it should be in redux side
    if (!allowActive)
      toast.success(`${destinationName} is now in Active status`, {
        draggable: true,
        autoClose: 3000,
      });
    else
      toast.success(`${destinationName} is removed from Active status`, {
        draggable: true,
        autoClose: 3000,
      });
  };

  return (
    <Fragment>
      <tr>
        <td>{_id}</td>
        <td>{destinationName}</td>
        <td>{noOfDays}</td>
        <td>{price}</td>
        <td>
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </td>
        <td>
          <label className="switch">
            <input
              type="checkbox"
              name="allowActive"
              value={allowActive}
              defaultChecked={isActive}
              onChange={(e) => onActiveChange(e)}
            />
            <span className="slider round"></span>
          </label>
        </td>
        <td>
          <Link to={`/admin$custom_tours$destination$${tourId}$${_id}`}>
            <input type="button" value="View" className="btn btn-primary" />
          </Link>
        </td>
        <td>
          <Link to={`/destination_details$${tourId}$${_id}`}>
            <input type="button" value="View" className="btn btn-primary" />
          </Link>
        </td>
        <td>
          <input
            type="submit"
            value="Delete"
            onClick={() => deleteDestination(tourId, _id)}
            className="btn btn-danger"
          />
        </td>
      </tr>
    </Fragment>
  );
};

AllDestinationsItem.propTypes = {
  destination: PropTypes.object.isRequired,
  deleteDestination: PropTypes.func.isRequired,
  tourId: PropTypes.string.isRequired,
  updateDestinationActive: PropTypes.func.isRequired,
};

export default connect(null, { deleteDestination, updateDestinationActive })(
  AllDestinationsItem
);
