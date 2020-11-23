import React, { useContext } from "react";
import { StateContext } from "../utils/context";

const Avatar = () => {
  const { userData } = useContext(StateContext);

  return (
    <section id="user__details">
      <div className="user__pic">
        {userData.avatar_url && (
          <img
            src={userData.avatar_url}
            alt={userData.login}
            className="profile-pic"
          />
        )}
      </div>
      <div className="user__info">
        <h1>{userData.login}</h1>
        {userData.name && <div className="name">{userData.name}</div>}
        {userData.location && (
          <div className="location">
            <span className="icon">
              <i className="fas fa-map-marker-alt"></i>
            </span>
            {userData.location}
          </div>
        )}
      </div>
    </section>
  );
};

export default Avatar;
