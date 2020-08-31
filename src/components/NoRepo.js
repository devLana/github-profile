import React from "react";
import PropTypes from "prop-types";

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

NoRepo.propTypes = {
  user: PropTypes.string,
};
