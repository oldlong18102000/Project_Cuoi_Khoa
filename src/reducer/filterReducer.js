const initState = {
    status: '',
    client: '',
    invoice: '',
    id: '',
};

const filtersReducer = (state = initState, action) => {
    switch (action.type) {
        case 'filters/statusFilterChange':
            return {
                ...state,
                status: action.payload
            }
        case 'filters/clientFilterChange':
            return {
                ...state,
                client: action.payload
            }
        case 'filters/searchFilterChange':
            return {
                ...state,
                invoice: action.payload,
            };
        default:
            return state;
    }
};

export default filtersReducer;