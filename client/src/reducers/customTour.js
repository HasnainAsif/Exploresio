const {
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
} = require("../actions/types");

const initialState = {
  loading: true,
  tour: null,
  error: {},
  tours: [],
  destination: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SUPERDEST_CREATE_SUCCESS:
    case ADD_IMG_SUCCESS:
    case DESTINATION_CREATE_SUCCESS:
    case GET_CUSTOM_TOUR:
      return {
        ...state,
        tour: payload,
        loading: false,
      };

    case CUSTOMTOUR_JOIN_SUCCESS:
      return {
        ...state,
        destination: { ...state.destination, msg: payload },
        loading: false,
      };

    case GET_DESTINATION:
      return {
        ...state,
        destination: payload,
        loading: false,
      };

    case SUPERDEST_CREATE_ERR:
    case CUSTOMTOUR_CREATE_ERR:
    case ADD_IMG_ERR:
    case ERR_CUSTOM_TOURS:
    case ERR_JOINING:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case GET_CUSTOM_TOURS:
      return {
        ...state,
        loading: false,
        tours: payload,
      };

    case DELETE_CUSTOM_TOUR:
      return {
        ...state,
        tours: state.tours.filter((tour) => tour._id !== payload),
        loading: false,
      };

    case REMOVE_DESTINATION:
      return {
        ...state,
        tour: {
          ...state.tour,
          destinations: state.tour.destinations.filter(
            (destination) => destination._id !== payload
          ),
        },
        loading: false,
      };

    case UPDATE_DESTINATION_ACTIVE:
      return {
        ...state,
        tour: {
          ...state.tour,
          destinations: state.tour.destinations.map((destination) =>
            destination._id === payload.id
              ? { ...destination, isActive: payload.isActive }
              : destination
          ),
        },
        loading: false,
      };

    case TOUR_JOINING:
      return {
        ...state,
        destination: {
          ...state.destination,
          joinTour: state.destination.joinTour.map((joining) =>
            joining._id === payload.id
              ? { ...joining, joinPrice: payload.joinPrice }
              : joining
          ),
        },
        loading: false,
      };

    default:
      return state;
  }
};
