import {type FC } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { showsQueryChange } from "../actions/Shows";
import { connect, type ConnectedProps } from "react-redux";
import { showsQuerySelector, showsSelector } from "../selectors/Shows";
import type { State } from "../store";

type ShowDetailPageProps=ReduxProps

const ShowListPage:FC<ShowDetailPageProps>=({query,shows,showsQueryChange})=> {
    return (
        <div className="mt-2">
        <SearchBar value={query} onChange={(event)=>{showsQueryChange(event.target.value)}}/>
        {shows && <div className="flex flex-wrap justify-center">
            {shows.map((s)=><ShowCard key={s.id} show={s}/>)}
        </div>}
        </div>
    );
}


const mapDispathToProps={
    showsQueryChange:showsQueryChange
}

const mapStateToProps=(state:State)=>{
    return {query:showsQuerySelector(state),shows:showsSelector(state)}
}

const connector=connect(mapStateToProps,mapDispathToProps);
type ReduxProps = ConnectedProps<typeof connector>

export default connector(ShowListPage);


// User types query → dispatches action → saga fetches shows for that query → reducer stores them → selectors give fresh shows + query → UI re-renders with filtered list.