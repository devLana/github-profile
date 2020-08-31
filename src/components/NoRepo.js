import React from "react";

const NoRepo = ({ user }) => {
  return (
    <div className="no--repo">
      <p>
        <strong>{user}</strong> has not created any Github repositories yet.
      </p>
    </div>
  );
};

export default NoRepo;
