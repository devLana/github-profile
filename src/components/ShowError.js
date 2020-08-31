import React from "react";
import PropTypes from "prop-types";

const ShowError = ({ empty, user }) => {
  return (
    <>
      {empty && user ? (
        <div className="not-found">
          <h2>{`"${user}"`} not found</h2>
          <p>It seems the user you have searched for doesn't exist.</p>
          <p>Please check the spelling and try again.</p>
        </div>
      ) : (
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>
            An error has occurred and we can't complete that action right now.
          </p>
          <p>
            Please try again later, or{" "}
            <strong>
              check your network connection and refresh the browser
            </strong>
            .
          </p>
        </div>
      )}
    </>
  );
};

export default ShowError;

ShowError.propTypes = {
  empty: PropTypes.bool,
  user: PropTypes.string,
};
