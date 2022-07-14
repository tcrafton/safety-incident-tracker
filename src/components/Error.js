import React from "react";

const Error = ({ errorMessage }) => {
  return (
    <div className="section section-center">
      <h2>looks like there's a problem...</h2>

      {errorMessage ? (
        <>
          <h4>{errorMessage ? `Status: ${errorMessage.status}` : ""}</h4>
          <h4>
            {errorMessage ? `Status Text: ${errorMessage.statusText}` : ""}
          </h4>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Error;
