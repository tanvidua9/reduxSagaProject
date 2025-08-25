import { useEffect, useState, type FC } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { serachShows } from "../api";
import type { Show } from "../Models/Show";
import { showsLoaded, showsQueryChange } from "../actions/Shows";
import { connect } from "react-redux";
import { showsQuerySelector, showsSelector } from "../selectors/Shows";
import type { State } from "../store";

type ShowDetailPageProps={
    shows:Show[];
    query:string;
    showsLoaded:(shows:Show[])=>void;
    showsQueryChange:(query:string)=>void
}

const ShowListPage:FC<ShowDetailPageProps>=({showsLoaded,query,shows,showsQueryChange})=> {
    useEffect(()=>{
        serachShows(query).then(shows=>showsLoaded(shows));
    },[query])

    return (
        <div className="mt-2">
        <SearchBar value={query} onChange={(event)=>{showsQueryChange(event.target.value)}}/>
        <div className="flex flex-wrap justify-center">
            {shows.map((s)=><ShowCard key={s.id} show={s}/>)}
        </div>
        </div>
    );
}


const mapDispathToProps={
    showsLoaded:showsLoaded,
    showsQueryChange:showsQueryChange
}

const mapStateToProps=(state:State)=>{
    return {query:showsQuerySelector(state),shows:showsSelector(state)}
}

export default connect(mapStateToProps,mapDispathToProps)(ShowListPage);