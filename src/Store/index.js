import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {LoginReducers} from '../Reducers/LoginReducers';
import {HomeReducers} from '../Reducers/HomeReducers';

const rootReducer=combineReducers({LoginReducers,HomeReducers});
const store=createStore(rootReducer,applyMiddleware(thunk));
export default store

