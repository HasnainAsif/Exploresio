import { POST_EMAIL_SUCCESS, POST_EMAIL_ERR, EMAIL_MSG_SUCCESS, EMAIL_MSG_ERR } from "../actions/types"

const initialState = {
    loading : true,
    newsletter : [],
    error : {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case POST_EMAIL_SUCCESS:
    case EMAIL_MSG_SUCCESS:
        return { 
            ...state, 
            ...payload,
            loading : false
        }
    case POST_EMAIL_ERR:
    case EMAIL_MSG_ERR:
        return { 
            ...state, 
            error : payload,
            loading : false
        }

    default:
        return state
    }
}
