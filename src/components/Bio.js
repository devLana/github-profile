import React from "react";
import extractDate from "../utils/dateFormat";

const Bio = props => {
  return (
    <>
      {props.bio && <p className="bio">{props.bio}</p>}
      <div className="repos">
        <span className="icon"><i className="fas fa-book"></i></span>
        {`${props.repos} repositories`}
      </div>
      <div className="followers__following">
        <span className="icon"><i className="fas fa-users"></i></span>
        <span className="following">
          <span className="count">{props.following}</span> following
        </span>
        <span className="followers">
          <span className="count">{props.followers}</span> followers
        </span>
      </div>
      <div className="join__date">
        <span className="icon"><i className="fas fa-calendar-alt"></i></span>
        Joined Github, {extractDate(props.created)}.
      </div>
      <p className="github--redirect">
        Check out <a href={props.url}>{props.user} on Github</a> for more details.
      </p>
    </>
  );
};

export default Bio;
