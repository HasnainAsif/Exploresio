import axios from "axios";
import {
  REGISTER_MSG,
  REGISTER_FAIL,
  VERIFY_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_USERS,
  ERR_USERS,
  DELETE_USER,
  LOAD,
  UPDATE_USER,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import $ from "jquery";

//loading === true
export const loadin = () => (dispatch) => {
  dispatch({
    type: LOAD,
  });
};

//Load User
export const loadUser = () => (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  axios
    .get("/users/auth")
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//Register User
export const register = ({ name, email, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/users/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_MSG,
        payload: res.data,
      });
      dispatch(setAlert(res.data.msg, res.data.alertType));
    })
    .catch((err) => {
      const errors = err.response.data.errors;

      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

//Verify Email of User
export const verify = () => (dispatch) => {
  axios
    .get("/users/verify")
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: VERIFY_FAIL,
      });
      dispatch(setAlert(err.response.data.msg, err.response.data.alertType));
    });
};

//Login User
export const login = ({ email, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  axios
    .post("/users/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(setAlert("You are successfully logged in", "success"));
      dispatch(loadUser());
    })
    .catch((err) => {
      const errors = err.response.data.errors;

      if (errors)
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));

      dispatch({
        type: LOGIN_FAIL,
      });
      setAlert(
        err.response.data.msg + ": Please try again",
        err.response.data.alertType
      );
    });
};

// Logout / Clear User
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch(setAlert("You have successfully logged out", "success"));
};

//Get All Users data
export const getUsers = () => (dispatch) => {
  axios
    .get("/admin/users")
    .then((res) => {
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERR_USERS,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};

//Delete User by Id
export const deleteUser = (id) => (dispatch) => {
  axios
    .delete(`/admin/users/${id}`)
    .then((res) => {
      dispatch({
        type: DELETE_USER,
        payload: id,
      });
    })
    .catch((err) => {
      dispatch({
        type: ERR_USERS,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    });
};

//Make/Remove a user from admin
export const updateAdmin = (id, status) => (dispatch) => {
  $(document).ready(function () {
    $.ajax({
      type: "PUT",
      url: `/admin/users/isAdmin`,
      data: { id: id, allowAdmin: status },
      cache: false,
      headers: {
        "cache-control": "no-cache",
        "x-auth-token": localStorage.token,
      },
      success: function (data, success) {
        dispatch({
          type: UPDATE_USER,
          payload: { id: data._id, isAdmin: data.isAdmin },
        });
      },
      error: function (err) {
        dispatch({
          type: ERR_USERS,
        });
        // console.log(err)
      },
    });
  });
};
