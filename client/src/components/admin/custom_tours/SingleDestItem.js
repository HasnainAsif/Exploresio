import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
//For Toastr
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { allowJoining } from "../../../actions/customTour";

const SingleDestItem = ({
  joining: {
    _id,
    user,
    name,
    email,
    address,
    seatsType,
    joiningDate,
    phoneNumber,
    noOfSeats,
    paymentType,
    joinPrice,
  },
  tourId,
  destId,
  allowJoining,
}) => {
  const [formData, setFormData] = useState({
    tourPrice: "",
  });
  const { tourPrice } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    allowJoining(formData, tourId, destId, _id);
  };
  return (
    <Fragment>
      <div className="my-box-exploresio">
        <ToastContainer />
        <div className="row">
          <div className="col no-gutters">
            <div className="my-text color1">
              <p>User Id</p>
              <p>Name</p>
              <p>Email</p>
              <p>Address</p>
              <p>Phone Number</p>
              <p>No Of Seats</p>
              <p>Seats Type</p>
              <p>Payment Method</p>
              <p>Joining Date</p>
              {joinPrice ? <p>Tour Price</p> : <p>Enter Price</p>}
            </div>
          </div>
          <div className="col">
            <div className="my-text color2">
              <p>{user}</p>
              <p>{name}</p>
              <p>{email}</p>
              <p>{address}</p>
              <p>{phoneNumber}</p>
              <p>{noOfSeats}</p>
              <p>{seatsType.join(",")}</p>
              <p>{paymentType}</p>
              <p>
                <Moment format="YYYY/MM/DD">{joiningDate}</Moment>
              </p>
              {joinPrice ? (
                <p>{joinPrice}</p>
              ) : (
                <form onSubmit={(e) => onSubmit(e)}>
                  <p>
                    <input
                      type="number"
                      name="tourPrice"
                      value={tourPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, tourPrice: e.target.value })
                      }
                    />
                    <button type="submit" className="btn btn-primary mt-2">
                      Submit
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SingleDestItem.propTypes = {
  joining: PropTypes.object.isRequired,
  allowJoining: PropTypes.func.isRequired,
};

export default connect(null, { allowJoining })(SingleDestItem);
