const initState = {
    vendor: '',
};

const filtersReducer = (state = initState, action) => {
    switch (action.type) {
        case 'searchVendorChange':
            return {
                ...state,
                vendor: action.payload
            }
        default:
            return state;
    }
};

export default filtersReducer;