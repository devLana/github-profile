import React from "react";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const ShowError = ({ empty, query, reset }) => {
  const { user } = useParams();
  const history = useHistory();

  const refresh = () => {
    history.replace('/""');
    setTimeout(() => {
      reset();
      history.replace(`/${user}`);
    }, 1);
  };

  return (
    <>
      {empty && query ? (
        <div className="not-found">
          <h2>{`"${query}"`} not found</h2>
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
          <button onClick={refresh}>Refresh</button>
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
