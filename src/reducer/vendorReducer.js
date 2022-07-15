import { FETCH_VENDOR_REQUEST, FETCH_VENDOR_SUCCESS, FETCH_VENDOR_ERROR } from "../action/types";

const INITIAL_STATE = {
    listVendors: []
};

const vendorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_VENDOR_REQUEST:
            console.log('FETCH_VENDOR_REQUEST: ', action)
            return {
                ...state,
            };
        case FETCH_VENDOR_SUCCESS:
            console.log('FETCH_VENDOR_SUCCESS: ', action)
            return {
                ...state, listVendors: action.dataVendors
            };
        case FETCH_VENDOR_ERROR:
            console.log('FETCH_VENDOR_ERROR: ', action)
            return {
                ...state,
            };
        default: return state;
    }
};

export default vendorReducer;