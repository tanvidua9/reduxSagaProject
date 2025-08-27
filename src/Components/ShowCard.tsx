import { Link } from "react-router-dom";
import type { Show } from "../Models/Show";
import type { FC } from "react";

type ShowCardProps={
  show:Show
};

const placeholderImage="https://images.pexels.com/photos/28216688/pexels-photo-28216688.png"

const ShowCard:FC<ShowCardProps>=({show})=>{
  return (
    <div className="max-w-xs rounded-md shadow-md p-2 m-1">
      <img
        src={show.image?.medium || placeholderImage}
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{show.name}</h2>
          {show.summary}
        </div>
        <Link to={`/show/${show.id}`}
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ShowCard;