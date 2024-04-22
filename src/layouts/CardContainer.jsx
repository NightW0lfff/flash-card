import React from "react";
import ClassItem from "../components/ClassItem";

function Card() {
  const cardData = [
    {
      id: 1,
      title:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic assumenda nostrum saepe. Officia ut et dolorum, ullam veritatis nemo sit qui repudiandae magnam non aperiam provident inventore ratione deserunt harum.",
      count: 1,
    },
    {
      id: 2,
      title: "test1",
      count: 0,
    },
  ];

  return (
    <div className="card">
      {cardData.map((data) => (
        <ClassItem key={data.id} title={data.title} count={data.count} />
      ))}
    </div>
  );
}

export default Card;
