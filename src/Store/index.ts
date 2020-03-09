import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import * as reducers from '../reducers';
import thunk from 'redux-thunk';

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

export const reducer = combineReducers(reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;
const store = process.env.NODE_ENV === 'production' ?
	createStore(reducer, applyMiddleware(thunk)) :
	createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
export type RootState = ReturnType<typeof reducer>;
