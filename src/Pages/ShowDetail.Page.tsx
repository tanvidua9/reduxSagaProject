import { useEffect, type FC } from "react";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { type WithRouterProps } from "../hocs/withRouter";
import { Link } from "react-router-dom";
import {IoArrowBack} from "react-icons/io5";
import type { State } from "../store";
import { connect, type ConnectedProps } from "react-redux";
import { showsMapSelector } from "../selectors/Shows";
import { loadShowAction } from "../actions/Shows";

type ownProps = WithRouterProps;

type ShowDetailPageProps = ReduxProps& ownProps;

const ShowDetailPage: FC<ShowDetailPageProps> = ({params,show,loadShow }) => {

  useEffect(()=>{
    loadShow(+params.id);
  },[params.id])

  
  if(!show){
    return <div className="text-3xl font-bold text-blue-950">Loading show details</div>
  }

  return (
    <div className="mt-2">
        <Link className="flex items-center" to="/"><IoArrowBack/>Back</Link>
      <h2 className="text-4xl font-semibold tracking-wide">{show!.name}</h2>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {show!.genres.map((genre)=><GenrePill name={genre} key={genre}/>)}
      </div>
      <div className="mt-2 flex">
        <img
          src={show!.image?.medium || "https://static.tvmaze.com/uploads/images/medium_portrait/423/1058422.jpg"}
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          <p dangerouslySetInnerHTML={{__html: show?.summary || ""}}></p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating: <span className="text-gray-700">{show!.rating.average}/10</span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap">
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
            name="Henry Cavill"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
            name="Freya Allan"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
            name="Anya Chalotra"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
            name="Mimi Ndiweni"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
            name="Henry Cavill"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
            name="Freya Allan"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
            name="Anya Chalotra"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
            name="Mimi Ndiweni"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545468.jpg"
            name="Henry Cavill"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545472.jpg"
            name="Freya Allan"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/218/545470.jpg"
            name="Anya Chalotra"
          />
          <CastCard
            avatarLink="https://static.tvmaze.com/uploads/images/medium_portrait/232/581040.jpg"
            name="Mimi Ndiweni"
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: ownProps) => {
  const showsMap = showsMapSelector(state);
  const  id  = ownProps.params.id; 
  return { show: id ? showsMap[Number(id)] : undefined };
};

const mapDispatchToProps={
  loadShow : loadShowAction
}


const connector= connect(mapStateToProps,mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage));




// By default: React shows HTML strings as plain text ({show.summary} → you see <b>text</b>).
// With dangerouslySetInnerHTML: React injects the string as real HTML (dangerouslySetInnerHTML={{__html: show.summary}} → you see text in bold).
// Why used: When API gives HTML (e.g., summaries, descriptions with tags).
// Why “dangerous”: If content isn’t trusted, it can cause XSS attacks.
// Use only when: You must render HTML from a safe/trusted source.
//Before = raw tags as text
//After = formatted HTML rendered