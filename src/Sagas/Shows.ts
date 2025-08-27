import {call, put} from "redux-saga/effects"
import { loadShowDetail, serachShows } from "../api"
import type { Action } from "../actions"
import { showLoadedAction, showsLoaded } from "../actions/Shows";

export function* fetchShows(action:Action):Generator<any,any,any>{
    const shows= yield call(serachShows,action.payload);
    yield put(showsLoaded(shows));
    //Above line is same as below
    // const nextAction = yield call(showsLoaded,shows);
    // yield put(nextAction)
}

export function* fetchShowDetail(action:Action):Generator<any,any,any>{
    const show= yield call(loadShowDetail,action.payload);
    yield put(showLoadedAction(show));
}

//Downsides of not using yield
//1. unit testing becomes difficult
//2. Process can't be stopped midway.