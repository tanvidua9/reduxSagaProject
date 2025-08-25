import type { ActionCreator } from ".";
import type { Show } from "../Models/Show";

export const SHOWS_LOADED = "SHOWS_LOADED";

export const showsLoaded: ActionCreator<Show[]> = (shows: Show[]) => ({
  type: SHOWS_LOADED,
  payload: shows
});



export const SHOWS_QUERY_CHANGE = "SHOWS_QUERY_CHANGE";

export const showsQueryChange: ActionCreator<string> = (query) => ({
    type: SHOWS_QUERY_CHANGE,
    payload: query
});