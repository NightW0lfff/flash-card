import React from "react";

function Loading() {
  return (
    <div className="blur-bg">
      <div className="loading">
        <h1 className="loading--title">
          <span className="loading--icon fa-solid fa-spinner" />
          {"\t"}Loading . . .
        </h1>
      </div>
    </div>
  );
}

export default Loading;
