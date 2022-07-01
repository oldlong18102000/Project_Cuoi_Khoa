
import { createStore, applyMiddleware } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducer/rootReducer';
//import thunk from 'redux-thunk';
import ThunkMiddleware from 'redux-thunk';


const store = createStore(rootReducer,

    composeWithDevTools(applyMiddleware(ThunkMiddleware)));


export default store;