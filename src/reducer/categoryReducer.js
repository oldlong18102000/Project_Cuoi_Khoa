import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_ERROR } from "../action/types";

const INITIAL_STATE = {
    listCategories: []
};

const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_REQUEST:
            console.log('FETCH_CATEGORY_REQUEST: ', action)
            return {
                ...state,
            };
        case FETCH_CATEGORY_SUCCESS:
            console.log('FETCH_CATEGORY_SUCCESS: ', action)
            return {
                ...state, listCategories: action.dataCategories
            };
        case FETCH_CATEGORY_ERROR:
            console.log('FETCH_CATEGORY_ERROR: ', action)
            return {
                ...state,
            };
        default: return state;
    }
};

export default categoryReducer;