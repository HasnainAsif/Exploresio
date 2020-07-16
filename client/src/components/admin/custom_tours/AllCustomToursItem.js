import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "../../../switch.css";
import { connect } from "react-redux";
//For Toastr
// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { deleteCustomTour } from "../../../actions/customTour";
import { Link } from "react-router-dom";

const AllCustomToursItem = ({
  tour: { _id, superDestination, date, destinations },
  deleteCustomTour,
}) => {
  return (
    <Fragment>
      <tr>
        <td>{_id}</td>
        <td>{superDestination}</td>
        <td>{destinations.length}</td>
        <td>
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </td>
        <td>
          <Link to={`/travel_destination/${_id}`}>
            <input type="button" value="View" className="btn btn-primary" />
          </Link>
        </td>
        <td>
          <Link to={`/admin$custom_tours$destinations$${_id}`}>
            <input type="button" value="View" className="btn btn-primary" />
          </Link>
        </td>
        <td>
          <Link to={`/admin$custom_tours$create_destination$${_id}`}>
            <input type="button" value="Add" className="btn btn-primary" />
          </Link>
        </td>

        {/* <td>
                    <Link to={`/destination_details/${_id}`}>
                    <input type="button" value="View" className="btn btn-primary" />
                    </Link>
                </td>
                <td>
                    <Link to={`/admin$tours$${_id}`}>
                    <input type="button" value="View" className="btn btn-primary" />
                    </Link>
                </td> */}
        <td>
          <input
            type="submit"
            onClick={() => deleteCustomTour(_id)}
            value="Delete"
            className="btn btn-danger"
          />
        </td>
      </tr>
    </Fragment>
  );
};

AllCustomToursItem.propTypes = {
  tour: PropTypes.object.isRequired,
  deleteCustomTour: PropTypes.func.isRequired,
};

export default connect(null, { deleteCustomTour })(AllCustomToursItem);
