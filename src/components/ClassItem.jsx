import React from "react";

function ClassItem() {
  return (
    <div className="class">
      <div className="class__left_item">
        <div className="class__left_item--container">
          <div className="class__left_item--count">
            <h1 className="class__left_item--count-val">0</h1>
          </div>
        </div>
        <h2 className="class__left_item--title">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          quibusdam cum, eum, tempore natus aut ab, veniam id soluta aperiam
          alias reiciendis necessitatibus cupiditate unde veritatis perspiciatis
          porro sapiente esse!
        </h2>
      </div>
      <div className="class__right_item">
        <div className="class__right_item--icon fa-regular fa-pen-to-square" />
        <div className="class__right_item--icon fa-solid fa-trash" />
        {/* <div className="class__right_item--icon fa-regular fa-star" />
        <div className="class__right_item--icon fa-solid fa-star" /> */}
      </div>
    </div>
  );
}

export default ClassItem;
