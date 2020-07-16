import axios from 'axios'
import { POST_EMAIL_SUCCESS, POST_EMAIL_ERR, EMAIL_MSG_SUCCESS, EMAIL_MSG_ERR } from './types'
import { setAlert } from "./alert";
import $ from 'jquery'

//Make/Remove a user from admin
export const postEmail = (email) => dispatch => {
    const body = JSON.stringify({email : email})
    $.ajax({
      type : 'POST',
      url : `/newsletter`,
      data : body,
      cache : false,
      dataType: "json",
      contentType: 'application/json; charset=utf-8',
      headers: {
        'Content-Type' : 'application/json',
        "cache-control": "no-cache"
      },
      success : function(data,success){
        dispatch({
            type : POST_EMAIL_SUCCESS,
            payload : data
        })
        dispatch(setAlert(data.msg,data.alertType))
      },
      error : function(err){
        console.log(err)
        const errors = err.responseJSON.errors

        if(errors)
            $.each(errors,(index,error) => {
                dispatch(setAlert(error.msg , 'danger'))});

        dispatch({
            type : POST_EMAIL_ERR,
            payload : {msg : err.statusText, status : err.status}
        })
      }
    });
}

//Send Msg to all Emails
export const emailMsg = (subject,body) => dispatch => {
  const config = {
      headers : {
          'Content-Type' : 'application/json'
      }
  }
  const data = JSON.stringify({subject,body})

  axios.post('/admin/newsletter' , data , config)
  .then(res => {
      dispatch({
          type : EMAIL_MSG_SUCCESS,
          payload : res.data
      })
      dispatch(setAlert(res.data.msg , res.data.alertType))
  })
  .catch(err => {
      const errors = err.response.data.errors

      if(errors)
          errors.forEach(error => dispatch(setAlert(error.msg , 'danger')));

      dispatch({
          type : EMAIL_MSG_ERR,
          payload : {msg : err.statusText, status : err.status}
      })
  })
}