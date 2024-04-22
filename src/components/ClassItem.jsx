import React, { useState } from "react";

function ClassItem({ key, title, count }) {
  const [isEditting, setEditting] = useState(false);

  const handleEditting = () => {
    setEditting((prev) => !prev);
  };

  return (
    <div className="class">
      <div className="class__left_item">
        <div className="class__left_item--container">
          <div className="class__left_item--count">
            <h1 className="class__left_item--count-val">{count}</h1>
          </div>
        </div>
        {isEditting ? (
          <input
            type="text"
            defaultValue={title}
            onKeyDownCapture={(e) => {
              // e.key === "Enter" && handleEditting();
              // console.log(e.target.value === e.target.defaultValue);
            }}
          />
        ) : (
          <h2 className="class__left_item--title">{title}</h2>
        )}
      </div>
      <div className="class__right_item">
        <div
          className="class__right_item--icon fa-regular fa-pen-to-square"
          onClick={() => handleEditting()}
        />
        <div className="class__right_item--icon fa-solid fa-trash" />
        {/* <div className="class__right_item--icon fa-regular fa-star" />
        <div className="class__right_item--icon fa-solid fa-star" /> */}
      </div>
    </div>
  );
}

export default ClassItem;
