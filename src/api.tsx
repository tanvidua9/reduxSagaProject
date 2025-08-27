import axios from "axios";
import type { Show } from "./Models/Show";

const BASE_URL="https://api.tvmaze.com/";

export const serachShows=(keyword:String)=>{
    return axios.get<{show:Show}[]>(BASE_URL+"search/shows?q="+keyword).then
    ((response)=>response.data.map((item)=>item.show))
}


export const loadShowDetail=(id:number)=>{
    return axios.get(BASE_URL+"shows/"+id)
    .then((response)=> response.data);
}