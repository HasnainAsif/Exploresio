import {REGISTER_MSG, REGISTER_FAIL, REGISTER_SUCCESS,
        VERIFY_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, USER_LOADED, LOGOUT, GET_USERS, ERR_USERS, DELETE_USER, LOAD, UPDATE_USER, } from "../actions/types"


const initialState = {
    token : localStorage.getItem('token'),
    loading : true,
    isAuthenticated : null,
    user : null,
    users : [],
    error : {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case LOAD:
        return{
            ...state,
            loading : true
        }

    case USER_LOADED:
        return{
            ...state,
            isAuthenticated : true,
            loading : false,
            user : payload
        }

    case REGISTER_MSG:
    case REGISTER_SUCCESS:
    case REGISTER_FAIL:
    case VERIFY_FAIL:
        return { 
            ...state, 
            ...payload,
            loading : false
        }
    case ERR_USERS:
        return { 
            ...state, 
            error : payload,
            loading : false
        }
    
    case LOGIN_SUCCESS:
        localStorage.setItem('token' , payload.token)
        return { 
            ...state, 
            ...payload,
            isAuthenticated : true,
            loading : true     
        }

    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
        localStorage.removeItem('token')
        return { 
            ...state, 
            token : null,
            isAuthenticated : false,
            loading : false,
            user : null,
            users : []
        }

    case GET_USERS:
        return {
            ...state,
            loading : false,
            users : payload
        }
    
    case DELETE_USER:
        return {
            ...state,
            users : state.users.filter(user => user._id !== payload),
            loading : false
        }

    case UPDATE_USER:
        return {
            ...state,
            users : state.users.map(user => 
                user._id === payload.id ? {...user , isAdmin : payload.isAdmin} : user
            ),
            loading : false
        }

    default:
        return state
    }
}
