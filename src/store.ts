import { configureStore } from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import showReducer from "./reducers/Shows";

const reducer= combineReducers({
    shows:showReducer
});


const store = configureStore({reducer});

export type  State = ReturnType<typeof reducer>

export default store;



