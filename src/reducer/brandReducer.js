import { FETCH_BRAND_REQUEST, FETCH_BRAND_SUCCESS, FETCH_BRAND_ERROR } from "../action/types";

const INITIAL_STATE = {
    listBrands: []
};

const brandReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BRAND_REQUEST:
            console.log('FETCH_BRAND_REQUEST: ', action)
            return {
                ...state,
            };
        case FETCH_BRAND_SUCCESS:
            console.log('FETCH_BRAND_SUCCESS: ', action)
            return {
                ...state, listBrands: action.dataBrands
            };
        case FETCH_BRAND_ERROR:
            console.log('FETCH_BRAND_ERROR: ', action)
            return {
                ...state,
            };
        default: return state;
    }
};

export default brandReducer;