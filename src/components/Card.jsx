import React from "react";

function Card() {
  return (
    <div className="card__content">
      <div className="card__content--btn-speaker btn__content-speaker fa-solid fa-volume-high" />
      <div className="card__content--header">
        <div className="card__content--header-title">Answer</div>
        <div className="card__content--header--container-btn">
          <div className="card__content--header-btn btn__card--header fa-regular fa-pen-to-square" />
          <div className="card__content--header-btn btn__card--header fa-solid fa-trash" />
        </div>
      </div>
      <div className="card__content--container-main">
        {/* {card.cards.length ? card.cards[0].answer : "No Data"} */}
      </div>
      <div
        className="card__content--btn-flip btn btn__content-flip"
        // onClick={handleCardFlip}
      >
        Flip it!
      </div>
    </div>
  );
}

export default Card;
