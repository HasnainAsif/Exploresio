import axios from "axios";
import $ from "jquery";
import { setAlert } from "./alert";
import { toast } from "react-toastify";
import {
  ADD_IMG_SUCCESS,
  ADD_IMG_ERR,
  SUPERDEST_CREATE_SUCCESS,
  SUPERDEST_CREATE_ERR,
  GET_CUSTOM_TOURS,
  ERR_CUSTOM_TOURS,
  DELETE_CUSTOM_TOUR,
  GET_CUSTOM_TOUR,
  DESTINATION_CREATE_SUCCESS,
  REMOVE_DESTINATION,
  GET_DESTINATION,
  UPDATE_DESTINATION_ACTIVE,
  CUSTOMTOUR_JOIN_SUCCESS,
  CUSTOMTOUR_CREATE_ERR,
  TOUR_JOINING,
  ERR_JOINING,
} from "./types";

//Add images
export const addImage = (data) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  axios
    .post("/admin/custom_tour/addImage", data, config)
    .then((res) => {
      dispatch({
        type: ADD_IMG_SUCCESS,
        payload: res.data,
      });
      const alertType = res.data.alertType;
      toast(res.data.msg, { draggable: true, type: alertType });
    })
    .catch((err) => {
      dispatch({
        type: ADD_IMG_ERR,
        payload: err.response.data,
      });
      toast.error(`${err.response.data}`, { draggable: true });
    });
};

//Create Main Destination
export const createMainDestination = (formData, history) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);

  if (window.confirm("Are You Sure, You wanna create a Main Destionation!!!"))
    axios
      .post("/admin/custom_tour", body, config)
      .then((res) => {
        dispatch({
          type: SUPERDEST_CREATE_SUCCESS,
          payload: res.data,
        });
        dispatch(setAlert("Main Destination has created", "success"));
        history.push("/admin$custom_tours");
      })
      .catch((err) => {
        const errors = err.response.data.errors;

        if (errors)
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

        dispatch({
          type: SUPERDEST_CREATE_ERR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      });
};

//Get All Custom Tours Data in Admin side
export const getCustomTours = () => (dispatch) => {
  axios
    .get("/admin/custom_tour")
    .then((res) => {
      dispatch({
        type: GET_CUSTOM_TOURS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERR_CUSTOM_TOURS,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      dispatch(setAlert(err.response.data, "error"));
    });
};

//Delete Custom Tour by Id
export const deleteCustomTour = (id) => (dispatch) => {
  if (window.confirm("Are You Sure, You wanna delete a custom Destionation!!!"))
    axios
      .delete(`/admin/custom_tour/${id}`)
      .then((res) => {
        dispatch({
          type: DELETE_CUSTOM_TOUR,
          payload: id,
        });
        dispatch(setAlert(res.data.msg, res.data.alertType));
      })
      .catch((err) => {
        dispatch({
          type: ERR_CUSTOM_TOURS,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      });
};

//Get Custom Tour By Id
//Home + Admin
export const getSingleCustomTour = (id) => (dispatch) => {
  axios
    .get(`/admin/custom_tour/${id}`)
    .then((res) => {
      dispatch({
        type: GET_CUSTOM_TOUR,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERR_CUSTOM_TOURS,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      // dispatch(setAlert(err.response.data , 'error'))
    });
};

//Create Custom Tour's Destination
export const createDestination = (formData, history) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);

  if (window.confirm("Are You Sure, You wanna create a Destionation!!!"))
    axios
      .post("/admin/custom_tour/destination", body, config)
      .then((res) => {
        dispatch({
          type: DESTINATION_CREATE_SUCCESS,
          payload: res.data,
        });
        dispatch(setAlert("Destination has created", "success"));
        history.push("/admin$custom_tours");
      })
      .catch((err) => {
        const errors = err.response.data.errors;

        if (errors)
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

        dispatch({
          type: SUPERDEST_CREATE_ERR,
          payload: {
            msg: err.response.statusText,
            status: err.response.status,
          },
        });
      });
};

//Delete Destination of a Custom Tour
//Delete Comment
export const deleteDestination = (tourId, destId) => (dispatch) => {
  axios
    .delete(`/admin/custom_tour/destination/${tourId}/${destId}`)
    .then((res) => {
      dispatch({
        type: REMOVE_DESTINATION,
        payload: destId,
      });
      dispatch(setAlert("Destination Removed", "success"));
    })
    .catch((err) => {
      dispatch({
        type: ERR_CUSTOM_TOURS,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};

//Get Single Destination of a Custom Tour By using Ids
export const getSingleDestination = (tourId, destId) => (dispatch) => {
  axios
    .get(`/admin/custom_tour/${tourId}/${destId}`)
    .then((res) => {
      dispatch({
        type: GET_DESTINATION,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERR_CUSTOM_TOURS,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      // dispatch(setAlert(err.response.data , 'error'))
    });
};

//Make/Remove a destination for active status
export const updateDestinationActive = (tourId, id, status) => (dispatch) => {
  $(document).ready(function () {
    $.ajax({
      type: "POST",
      url: `/admin/custom_tour/destination/isActive`,
      data: JSON.stringify({ tourId: tourId, destId: id, allowActive: status }),
      headers: {
        "x-auth-token": localStorage.token,
        "Content-Type": "application/json",
      },
      success: function (data, success) {
        dispatch({
          type: UPDATE_DESTINATION_ACTIVE,
          payload: {
            id: data.destination._id,
            isActive: data.destination.isActive,
          },
        });
      },
      error: function (err) {
        dispatch({
          type: ERR_CUSTOM_TOURS,
          payload: { msg: err.statusText, status: err.status },
        });
        alert(err.statusText + " : Please try again", "danger");
      },
    });
  });
};

//Allow User to join for a tour
export const allowJoining = (tourPrice, tourId, destId, joiningId) => (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(tourPrice);

  axios
    .post(
      `/admin/custom_tour/destination/joinTour/${tourId}/${destId}/${joiningId}`,
      body,
      config
    )
    .then((res) => {
      dispatch({
        type: TOUR_JOINING,
        payload: {
          id: res.data.joinTour._id,
          joinPrice: res.data.joinTour.joinPrice,
        },
      });
      toast.success("Application Accepted");
    })
    .catch((err) => {
      dispatch({
        type: ERR_JOINING,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      alert(err.response.statusText + " : Please try again", "danger");
    });
};

////////////////////////////////HOME///////////////////////////////////

//Get All Custom Tours Data in Home Page
// export const getHomeCustomTours = () => (dispatch) => {
//   axios
//     .get("/custom_tour")
//     .then((res) => {
//       dispatch({
//         type: GET_CUSTOM_TOURS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: ERR_CUSTOM_TOURS,
//         // payload : {msg : err.response.statusText, status : err.response.status}
//       });
//       // dispatch(setAlert(err.response.data , 'error'))
//     });
// };

// /customTour/:tourId/:destId
//Join to a custom tour
export const joinCustomTour = (formData, tourId, destId) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);

  axios
    .post(`/custom_tour/${tourId}/${destId}`, body, config)
    .then((res) => {
      dispatch({
        type: CUSTOMTOUR_JOIN_SUCCESS,
        payload: res.data.msg,
      });
    })
    .catch((err) => {
      const errors = err.response.data.errors;

      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

      dispatch({
        type: CUSTOMTOUR_CREATE_ERR,
        payload: { msg: err.response.data.msg, status: err.response.status },
      });
    });
};
