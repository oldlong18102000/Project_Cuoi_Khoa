
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import counterReducer from './counterReducer';
import categoryReducer from './categoryReducer';
import brandReducer from './brandReducer';
import countryReducer from './countryReducer';
import vendorReducer from './vendorReducer';
import filtersReducer from './searchVendorReducer';


const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    categories: categoryReducer,
    brands: brandReducer,
    countries: countryReducer,
    vendors: vendorReducer,
    filters: filtersReducer,
});

export default rootReducer;