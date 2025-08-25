import { createSelector } from "@reduxjs/toolkit";
import type { State } from "../store";

const showStateSelector=(state:State)=> state.shows;

export const showsQuerySelector = createSelector(showStateSelector,(showState)=>showState.query);

export const showsMapSelector= createSelector(showStateSelector,(showsState)=> showsState.shows); //From the shows slice, it extracts the dictionary of shows (the normalized { id: show } object).

export const showsSelector=  createSelector(showsMapSelector,(showsMap)=>  //Converts the normalized shows object (dictionary) into an array of show objects.
    Object.keys(showsMap).map(showId=> showsMap[+showId])
);