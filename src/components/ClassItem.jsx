import React from "react";

function ClassItem() {
  return (
    <div className="class__container">
      <div className="class__left_item">
        <div className="class__left_item--container">
          <div className="class__left_item--count">
            <h1 className="class__left_item--count-val">0</h1>
          </div>
        </div>
        <h2 className="class__left_item--title">Test</h2>
      </div>
      <div className="class__right_item">
        <i className="class__right_item--icon fa-solid fa-magnifying-glass" />
      </div>
    </div>
  );
}

export default ClassItem;
