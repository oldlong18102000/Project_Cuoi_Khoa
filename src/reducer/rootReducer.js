
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import counterReducer from './counterReducer';
import filtersReducer from './filterReducer';


const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    filters: filtersReducer,
});

export default rootReducer;