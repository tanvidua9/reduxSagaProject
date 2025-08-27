import { type AnyAction } from "redux";
import {} from "../actions";
import type { Show } from "../Models/Show";
import { SHOW_DETAIL_LOADED, SHOWS_LOADED, SHOWS_QUERY_CHANGE } from "../actions/Shows";
import { produce } from "immer";
import {normalize, schema} from "normalizr"

export type State = {
    shows:{[showId:number]: Show};
    query_shows:{[query:string]:number[]}  //query:[1,2,3,4] , shows id against matching query to cache the already searched results
    query:string;
};

export const initialState: State = {
    shows:{},
    query_shows:{},
    query:"",
};

function showReducer(state = initialState, action: AnyAction): State {
  switch (action.type) {
    case SHOWS_LOADED:
      return produce(state,(draft)=>{
        const shows = action.payload as Show[];
        const showSchema=  new schema.Entity("shows");
        const normalizedData = normalize(shows,[showSchema]);
        draft.query_shows[draft.query] = normalizedData.result;
        draft.shows= {...draft.shows,...normalizedData.entities.shows};
      })
    
      case SHOWS_QUERY_CHANGE:
        return produce(state, (draft) => {
          draft.query=action.payload;
        });
      
      case SHOW_DETAIL_LOADED:
        return produce(state, (draft) => {
          const show = action.payload as Show;
          draft.shows[show.id] = show;
        });
    default:
      return state;
  }
}

export default showReducer;



// Without normalization (just saving as array):
// state = {
//   shows: [
//     { id: 1, name: "Breaking Bad" },
//     { id: 2, name: "Stranger Things" }
//   ]
// }

// With normalization (what your reducer does):
// After normalize(shows, [showSchema]), it becomes:
// normalizedData = {
//   entities: {
//     shows: {
//       1: { id: 1, name: "Breaking Bad" },
//       2: { id: 2, name: "Stranger Things" }
//     }
//   },
//   result: [1, 2]
// }
