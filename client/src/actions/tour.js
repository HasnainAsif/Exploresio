/* eslint-disable */
import axios from 'axios'
import $ from 'jquery'
import { TOUR_CREATE_SUCCESS, TOUR_CREATE_ERR, ADD_IMG_SUCCESS, ADD_IMG_ERR, GET_TOURS, 
         ERR_TOURS, DELETE_TOUR, UPDATE_ACTIVE_STATUS, UPDATE_CURRENT_STATUS, UPDATE_FINISHED_STATUS, GET_TOUR, TOUR_JOIN_SUCCESS } from "./types";
import { setAlert } from "./alert";
import { toast } from 'react-toastify';


//Add images
export const addImage = (data) => dispatch => {

    const config = {
        headers : {
            'Content-Type': 'multipart/form-data'
        }    
    }

    axios.post('/admin/tour/addImage' , data ,config)
    .then(res => {
        dispatch({
            type : ADD_IMG_SUCCESS,
            payload : res.data
        })
        const alertType = res.data.alertType
        toast(res.data.msg,{draggable: true,type : alertType})
    })
    .catch(err => {
        dispatch({
            type : ADD_IMG_ERR,
            payload : err.response.data
        })
        toast.error(`${err.response.data}`,{draggable: true})
    })
}

//Create a tour
export const createTour = (formData,history) => dispatch => {

    const config = {
        headers : {
            'Content-Type' : 'application/json'
            // 'Content-Type' : 'multipart/form-data'
            // 'Content-Type':'application/x-www-form-urlencoded'
            // 'X-Requested-With': 'XMLHttpRequest'
        }
        
    }
    const body = JSON.stringify(formData)
        
    if(window.confirm('Are You Sure, You wanna create a tour!!!'))
    axios.post('/admin/tour' , body ,config)
    .then(res => {
        dispatch({
            type : TOUR_CREATE_SUCCESS,
            payload : res.data
        })
        dispatch(setAlert('Tour has created' , 'success'))
        history.push('/admin$tours')
    })
    .catch(err => {
        const errors = err.response.data.errors

        if(errors)
            errors.forEach(error => dispatch(setAlert(error.msg , 'danger')));

        dispatch({
            type : TOUR_CREATE_ERR,
            payload : {msg : err.response.statusText , status : err.response.status}
        })
    })
}

//Get All Tours Data in Admin side
export const getTours = () => dispatch => {

    axios.get('/admin/tour').then(res => {
        dispatch({
            type : GET_TOURS,
            payload : res.data
        })
    }).catch(err => {
        dispatch({
            type : ERR_TOURS,
            payload : {msg : err.response.statusText, status : err.response.status}
        })
        dispatch(setAlert(err.response.data , 'error'))
    })
}

//Delete Tour by Id
export const deleteTour = (id) => dispatch => {
    axios.delete(`/admin/tour/${id}`).then(res => {
        dispatch({
            type : DELETE_TOUR,
            payload : id
        })
        dispatch(setAlert(res.data.msg, res.data.alertType))
        toast(res.data.msg, {type : res.data.alertType})
    }).catch(err => {
        dispatch({
            type : ERR_TOURS,
            payload : {msg : err.response.statusText, status : err.response.status}
        })
    })
}

//Make/Remove a tour for Active status
export const updateActive = (id,status) => dispatch => {
    $(document).ready(function () {
        $.ajax({
        type : 'POST',
        url : `/admin/tour/isActive`,
        data : JSON.stringify({id : id , allowActive : status}),
        headers: {
            "x-auth-token": localStorage.token,
            'Content-Type': 'application/json'
        },
        success : function(data,success){
            console.log(data)
            dispatch({
                type : UPDATE_ACTIVE_STATUS,
                payload : {id : data._id , isActive : data.isActive}
            })
        },
        error : function(err){
            dispatch({
                type : ERR_TOURS,
                payload : {msg : err.statusText, status : err.status}
            })
            alert(err.statusText + ' : Please try again' , 'danger')
        }
        });
    })
}

//Make/Remove a tour for Current status
export const updateCurrent = (id,status) => dispatch => {
    $(document).ready(function () {
        $.ajax({
        type : 'POST',
        url : `/admin/tour/isCurrent`,
        data : {id : id , allowCurrent : status},
        headers: {
            "x-auth-token": localStorage.token
        },
        success : function(data,success){
            console.log(data)
            dispatch({
                type : UPDATE_CURRENT_STATUS,
                payload : {id : data._id , isCurrent : data.isCurrent}
            })
        },
        error : function(err){
            dispatch({
                type : ERR_TOURS,
                payload : {msg : err.statusText, status : err.status}
            })
            alert(err.statusText + ' : Please try again' , 'danger')
        }
        });
    })
}

//Make/Remove a tour for Finished status
export const updateFinished = (id,status) => dispatch => {
    $(document).ready(function () {
        $.ajax({
        type : 'POST',
        url : `/admin/tour/isFinished`,
        data : {id : id , allowFinished : status},
        headers: {
            "x-auth-token": localStorage.token
        },
        success : function(data,success){
            console.log(data)
            dispatch({
                type : UPDATE_FINISHED_STATUS,
                payload : {id : data._id , isFinished : data.isFinished}
            })
        },
        error : function(err){
            dispatch({
                type : ERR_TOURS,
                payload : {msg : err.statusText, status : err.status}
            })
            alert(err.statusText + ' : Please try again' , 'danger')
        }
        });
    })
}

////////////////////////////////HOME///////////////////////////////////

//Get All Tours Data in Home Page
export const getHomeTours = () => dispatch => {

    axios.get('/tour').then(res => {
        dispatch({
            type : GET_TOURS,
            payload : res.data
        })
    }).catch(err => {
        dispatch({
            type : ERR_TOURS
            // payload : {msg : err.response.statusText, status : err.response.status}
        })
        // dispatch(setAlert(err.response.data , 'error'))
    })
}

//Get Tour By Id
export const getTourById = (id) => dispatch => {

    axios.get(`/tour/${id}`).then(res => {
        dispatch({
            type : GET_TOUR,
            payload : res.data
        })
    }).catch(err => {
        dispatch({
            type : ERR_TOURS
            // payload : {msg : err.response.statusText, status : err.response.status}
        })
        // dispatch(setAlert(err.response.data , 'error'))
    })
}

//Join to a tour
export const joinTour = (formData,id) => dispatch => {

    const config = {
        headers : {
            'Content-Type' : 'application/json'
        }
        
    }
    const body = JSON.stringify(formData)
        
    axios.post(`/tour/${id}` , body ,config)
    .then(res => {
        dispatch({
            type : TOUR_JOIN_SUCCESS,
            payload : res.data.msg
        })
    })
    .catch(err => {
        const errors = err.response.data.errors

        if(errors)
            errors.forEach(error => dispatch(setAlert(error.msg , 'danger')));

        dispatch({
            type : TOUR_CREATE__ERR,
            payload : {msg : err.response.data.msg , status : err.response.status}
        })
    })
}