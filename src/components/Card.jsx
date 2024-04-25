import React, { useState } from "react";

function Card() {
  const [isFlipped, setFlip] = useState(false);

  const handleCardFlip = () => {
    setFlip(!isFlipped);
  };

  return (
    <div className="card">
      <div
        className={`card__main card__main--front ${isFlipped ? "flipped" : ""}`}
      >
        <div className="card__main--btn-speaker btn__main-speaker fa-solid fa-volume-high" />
        <div className="card__main--header">
          <div className="card__main--header-title">Question</div>
          <div className="card__main--header--container-btn">
            <div className="card__main--header-btn btn__card--header fa-regular fa-pen-to-square" />
            <div className="card__main--header-btn btn__card--header fa-solid fa-trash" />
          </div>
        </div>
        <div className="card__main--container-main">Test</div>
        <div
          className="card__main--btn-flip btn btn__main-flip"
          onClick={handleCardFlip}
        >
          Flip it!
        </div>
      </div>
      <div
        className={`card__main card__main--back ${isFlipped ? "flipped" : ""}`}
      >
        <div className="card__main--btn-speaker btn__main-speaker fa-solid fa-volume-high" />
        <div className="card__main--header">
          <div className="card__main--header-title">Answer</div>
          <div className="card__main--header--container-btn">
            <div className="card__main--header-btn btn__card--header fa-regular fa-pen-to-square" />
            <div className="card__main--header-btn btn__card--header fa-solid fa-trash" />
          </div>
        </div>
        <div className="card__main--container-main">Back</div>
        <div
          className="card__main--btn-flip btn btn__main-flip"
          onClick={handleCardFlip}
        >
          Flip it!
        </div>
      </div>
    </div>
  );
}

export default Card;
