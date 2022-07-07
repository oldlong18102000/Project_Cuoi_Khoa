
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import counterReducer from './counterReducer';
import filtersReducer from './filterReducer';
import categoryReducer from './categoryReducer';
import brandReducer from './brandReducer';
import countryReducer from './countryReducer';


const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    filters: filtersReducer,
    categories: categoryReducer,
    brands: brandReducer,
    countries: countryReducer,
});

export default rootReducer;