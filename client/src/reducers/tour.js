import { TOUR_CREATE_SUCCESS, TOUR_CREATE_ERR, ADD_IMG_SUCCESS, ADD_IMG_ERR, 
         GET_TOURS, ERR_TOURS, DELETE_TOUR, UPDATE_ACTIVE_STATUS, UPDATE_CURRENT_STATUS, UPDATE_FINISHED_STATUS, GET_TOUR, TOUR_JOIN_SUCCESS } from "../actions/types"

const initialState = {
    loading : true,
    tour : null,
    error : {},
    tours : []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case TOUR_CREATE_SUCCESS:
    case ADD_IMG_SUCCESS:
    case GET_TOUR:
        return { 
            ...state, 
            tour : payload,
            loading : false 
        }

    case TOUR_JOIN_SUCCESS:
        return { 
            ...state, 
            tour : {...state.tour, msg : payload},
            loading : false 
        }
    
    case TOUR_CREATE_ERR:
    case ADD_IMG_ERR:
    case ERR_TOURS:
        return { 
            ...state, 
            error : payload,
            loading : false 
        }
    
    case GET_TOURS:
        return {
            ...state,
            loading : false,
            tours : payload
        }
    
    case DELETE_TOUR:
        return {
            ...state,
            tours : state.tours.filter(tour => tour._id !== payload),
            loading : false
        }
    
    case UPDATE_ACTIVE_STATUS:
        return {
            ...state,
            tours : state.tours.map(tour => 
                tour._id === payload.id ? {...tour , isActive : payload.isActive} : tour
            ),
            loading : false
        }
    
    case UPDATE_CURRENT_STATUS:
        return {
            ...state,
            tours : state.tours.map(tour => 
                tour._id === payload.id ? {...tour , isCurrent : payload.isCurrent} : tour
            ),
            loading : false
        }

    case UPDATE_FINISHED_STATUS:
        return {
            ...state,
            tours : state.tours.map(tour => 
                tour._id === payload.id ? {...tour , isFinished : payload.isFinished} : tour
            ),
            loading : false
        }

    default:
        return state
    }
}
