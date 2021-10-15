import React from "react";

interface ShowErrorProps<T> {
  error?: T;
  query?: T;
  refresh?: () => void;
}

const ShowError = ({ error, query, refresh }: ShowErrorProps<string>) => {
  if (error === "not found" && query) {
    return (
      <div className="not-found">
        <h2>{`"${query}"`} not found</h2>
        <p>It seems the user you have searched for doesn't exist.</p>
        <p>Please check the spelling and try again.</p>
      </div>
    );
  }

  if (error === "limit") {
    return (
      <div className="error-container">
        <h2>Limit Reached</h2>
        <p>You have reached the limit for profile searches.</p>
        <p>Please wait a few minutes and try again later.</p>
      </div>
    );
  }

  if (error === "network") {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>An error has occurred and your request could not be completed.</p>
        <p>
          Please wait a few minutes and try again later, or{" "}
          <strong>check your network connection and refresh the browser</strong>
          .
        </p>
        <button onClick={refresh}>Refresh</button>
      </div>
    );
  }

  return (
    <div className="error-container">
      <h2>Browser Offline</h2>
      <p>It appears you may be offline.</p>
      <p>
        Please{" "}
        <strong>check your network connection and refresh the browser</strong>.
      </p>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};

export default ShowError;
