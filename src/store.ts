import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import showReducer from "./reducers/Shows";
import createSagaMiddleware from "redux-saga";
import { debounce, takeEvery} from "redux-saga/effects";
import { LOAD_SHOW_ACTION, SHOWS_QUERY_CHANGE } from "./actions/Shows";
import { fetchShowDetail, fetchShows } from "./Sagas/Shows";

const reducer= combineReducers({
    shows:showReducer
});

function* rootSaga(){
    yield debounce(1000,SHOWS_QUERY_CHANGE,fetchShows) //1000ms
    yield takeEvery(LOAD_SHOW_ACTION,fetchShowDetail); 
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // add saga
});

sagaMiddleware.run(rootSaga);

export type  State = ReturnType<typeof reducer>

export default store;



