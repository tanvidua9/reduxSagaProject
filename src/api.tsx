import axios from "axios";
import type { Show } from "./Models/Show";
export const serachShows=(keyword:String)=>{
    return axios.get<{show:Show}[]>("https://api.tvmaze.com/search/shows?q="+keyword).then
    ((response)=>response.data.map((item)=>item.show))
}


