import { createSelector } from "@reduxjs/toolkit";
import type { State } from "../store";

const showStateSelector=(state:State)=> state.shows;

export const showsQuerySelector = createSelector(showStateSelector,(showState)=>showState.query);

export const showsMapSelector= createSelector(showStateSelector,(showsState)=> showsState.shows); //From the shows slice, it extracts the dictionary of shows (the normalized { id: show } object).

export const queryShowsMapSelector = createSelector(showStateSelector,
    (showsState)=> showsState.query_shows
)

export const showsSelector=  createSelector(showsMapSelector,showsQuerySelector, queryShowsMapSelector,(showsMap, query, queryShowMap)=>  //Converts the normalized shows object (dictionary) into an array of show objects.
    queryShowMap[query]?.map(showId=> showsMap[showId])
);


//WHEN DO WE WANT TO LOAD A SHOW DETAIL?
// 1. Whenever params.id changes in showDetail component -> approach using useffect
// 2. Whenever url changes to a new show id 


// Workflow of ShowDetailPage

// Page mounts (useEffect) → calls loadShow(params.id).
// (This dispatches LOAD_SHOW_ACTION with the show id).
// Saga listens for LOAD_SHOW_ACTION → runs fetchShowDetail.
// Calls API loadShowDetail(showId).
// On success → dispatches showLoadedAction(show).
// Reducer (SHOW_DETAIL_LOADED) → updates state:
// draft.shows[show.id] = show
// → stores the fetched show inside the shows dictionary (normalized by id).
// Component re-renders because Redux state updated →
// mapStateToProps finds showsMap[params.id] and passes it as show prop.
// Finally → UI displays the details (name, genres, summary, etc.).