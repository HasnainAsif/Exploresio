import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import "../../../switch.css";
import { connect } from "react-redux";
import {
  deleteTour,
  updateActive,
  updateCurrent,
  updateFinished,
} from "../../../actions/tour";
//For Toastr
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const AllToursItem = ({
  deleteTour,
  updateActive,
  updateCurrent,
  updateFinished,
  tour: {
    _id,
    destinationName,
    noOfDays,
    price,
    travelDate,
    date,
    isActive,
    isCurrent,
    isFinished,
  },
}) => {
  const [formData, setFormData] = useState({
    allowActive: isActive,
    allowCurrent: isCurrent,
    allowFinished: isFinished,
  });
  const { allowActive, allowFinished, allowCurrent } = formData;

  const onActiveChange = (e) => {
    setFormData({ ...formData, allowActive: !allowActive });
    updateActive(_id, !allowActive);
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
  const onCurrentChange = (e) => {
    setFormData({ ...formData, allowCurrent: !allowCurrent });
    updateCurrent(_id, !allowCurrent);
    //it should be in redux side
    if (!allowCurrent)
      toast.success(`${destinationName} is now in Current status`, {
        draggable: true,
        autoClose: 3000,
      });
    else
      toast.success(`${destinationName} is removed from Current status`, {
        draggable: true,
        autoClose: 3000,
      });
  };
  const onFinishedChange = (e) => {
    setFormData({ ...formData, allowFinished: !allowFinished });
    updateFinished(_id, !allowFinished);
    //it should be in redux side
    if (!allowFinished)
      toast.success(`${destinationName} is now in Finished status`, {
        draggable: true,
        autoClose: 3000,
      });
    else
      toast.success(`${destinationName} is removed from Finished status`, {
        draggable: true,
        autoClose: 3000,
      });
  };

  return (
    <Fragment>
      <tr>
        <td>
          {_id}
          <ToastContainer />
        </td>
        <td>{destinationName}</td>
        <td>{noOfDays}</td>
        <td>{price}</td>
        <td>
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </td>
        <td>
          <Moment format="YYYY/MM/DD">{travelDate}</Moment>
        </td>

        <td>
          <label className="switch">
            <input
              type="checkbox"
              name="allowActive"
              value={allowActive}
              disabled={allowCurrent || allowFinished ? "disabled" : ""}
              defaultChecked={isActive}
              onChange={(e) => onActiveChange(e)}
            />
            <span className="slider round"></span>
          </label>
        </td>
        <td>
          <label className="switch">
            <input
              type="checkbox"
              name="allowCurrent"
              value={allowCurrent}
              disabled={allowActive || allowFinished ? "disabled" : ""}
              defaultChecked={isCurrent}
              onChange={(e) => onCurrentChange(e)}
            />
            <span className="slider round"></span>
          </label>
        </td>
        <td>
          <label className="switch">
            <input
              type="checkbox"
              name="allowFinished"
              value={allowFinished}
              disabled={allowActive || allowCurrent ? "disabled" : ""}
              defaultChecked={isFinished}
              onChange={(e) => onFinishedChange(e)}
            />
            <span className="slider round"></span>
          </label>
        </td>
        <td>
          <Link to={`/destination_details/${_id}`}>
            <input type="button" value="View" className="btn btn-primary" />
          </Link>
        </td>
        <td>
          <Link to={`/admin$tours$${_id}`}>
            <input type="button" value="View" className="btn btn-primary" />
          </Link>
        </td>
        <td>
          <input
            type="submit"
            onClick={() => deleteTour(_id)}
            value="Delete"
            className="btn btn-danger"
          />
        </td>
      </tr>
    </Fragment>
  );
};

AllToursItem.propTypes = {
  tour: PropTypes.object.isRequired,
  deleteTour: PropTypes.func.isRequired,
  updateActive: PropTypes.func.isRequired,
  updateCurrent: PropTypes.func.isRequired,
  updateFinished: PropTypes.func.isRequired,
};

export default connect(null, {
  deleteTour,
  updateActive,
  updateCurrent,
  updateFinished,
})(AllToursItem);
