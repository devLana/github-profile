import React from "react";
import extractDate from "../utils/dateFormat";

interface ShowReposProps<T, U> {
  name: T;
  description: T;
  stars: U;
  forks: U;
  language: T;
  created: Date;
}

const ShowRepos = (props: ShowReposProps<string, number>) => {
  return (
    <div className="repo">
      <h3>{props.name}</h3>
      {props.description && <p>{props.description}</p>}
      <div className="repo__stats">
        <span className="repo__stars">
          <span className="icon">
            <i className="fas fa-star" />
          </span>
          {props.stars}
        </span>
        <span className="repo__forks">
          <span className="icon">
            <i className="fas fa-code-branch" />
          </span>
          {props.forks}
        </span>
      </div>
      <div className="repo__details">
        {props.language && (
          <span className="repo__language">{props.language}</span>
        )}
        <span className="repo__date">
          Created: {extractDate(props.created)}
        </span>
      </div>
    </div>
  );
};

export default ShowRepos;
