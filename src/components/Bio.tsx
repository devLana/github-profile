import React, { useContext } from "react";
import extractDate from "../utils/dateFormat";
import { StateContext } from "../utils/context";

const Bio = () => {
  const { userData } = useContext(StateContext);

  return (
    <section id="user__bio">
      {userData.bio && <p className="bio">{userData.bio}</p>}
      <div className="repos">
        <span className="icon">
          <i className="fas fa-book"></i>
        </span>
        {`${userData.public_repos} repositories`}
      </div>
      <div className="followers__following">
        <span className="icon">
          <i className="fas fa-users"></i>
        </span>
        <span className="following">
          <span className="count">{userData.following}</span> following
        </span>
        <span className="followers">
          <span className="count">{userData.followers}</span> followers
        </span>
      </div>
      <div className="join__date">
        <span className="icon">
          <i className="fas fa-calendar-alt"></i>
        </span>
        Joined Github, {extractDate(userData.created_at)}.
      </div>
      <p className="github--redirect">
        Check out <a href={userData.html_url}>{userData.login} on Github</a> for
        more details.
      </p>
    </section>
  );
};

export default Bio;
