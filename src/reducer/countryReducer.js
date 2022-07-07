import { FETCH_COUNTRY_REQUEST, FETCH_COUNTRY_SUCCESS, FETCH_COUNTRY_ERROR } from "../action/types";

const INITIAL_STATE = {
    listCountries: []
};

const countryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COUNTRY_REQUEST:
            console.log('FETCH_COUNTRY_REQUEST: ', action)
            return {
                ...state,
            };
        case FETCH_COUNTRY_SUCCESS:
            console.log('FETCH_COUNTRY_SUCCESS: ', action)
            return {
                ...state, listCountries: action.dataCountries
            };
        case FETCH_COUNTRY_ERROR:
            console.log('FETCH_COUNTRY_ERROR: ', action)
            return {
                ...state,
            };
        default: return state;
    }
};

export default countryReducer;