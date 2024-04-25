import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import { useParams } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";
import useFetch from "../functions/useFetch";

function FlashCard() {
  const { id } = useParams();
  const [card, setCard] = useState({
    cards: [],
  });
  const { speak } = useSpeechSynthesis();
  const [isFlipped, setFlip] = useState(false);

  const { data, error, isLoading, refetch } = useFetch(
    `http://localhost:8000/api/cards/${id}`
  );

  useEffect(() => {
    if (!data) return;
    setCard(data.card);
  }, [data]);

  const handleCardFlip = () => {
    setFlip(!isFlipped);
  };

  // <button onClick={() => speak({ text: value })}>Speech</button>;

  return (
    <div className="main">
      <Header displayButton={"none"} />
      {error || isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="card">
          <div className="card__overview">
            <div className="card__overview--total">
              Flashcards-{card ? card.cards.length : "0"}
            </div>
            <div className="card__overview--btn btn btn--create-card">
              Create Card
            </div>
          </div>
          <div className="card__container">
            <div className="card__btn card__btn--prev btn__arr">&larr;</div>
            {isFlipped ? (
              <div className="card__side card__side-back">
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
                    {card.cards.length ? card.cards[0].answer : "No Data"}
                  </div>
                  <div
                    className="card__content--btn-flip btn btn__content-flip"
                    onClick={handleCardFlip}
                  >
                    Flip it!
                  </div>
                </div>
              </div>
            ) : (
              <div className="card__side card__side-front">
                <div className="card__content">
                  <div className="card__content--btn-speaker btn__content-speaker fa-solid fa-volume-high" />
                  <div className="card__content--header">
                    <div className="card__content--header-title">Question</div>
                    <div className="card__content--header--container-btn">
                      <div className="card__content--header-btn btn__card--header fa-regular fa-pen-to-square" />
                      <div className="card__content--header-btn btn__card--header fa-solid fa-trash" />
                    </div>
                  </div>
                  <div className="card__content--container-main">
                    {card.cards.length ? card.cards[0].question : "No Data"}
                  </div>
                  <div
                    className="card__content--btn-flip btn btn__content-flip"
                    onClick={handleCardFlip}
                  >
                    Flip it!
                  </div>
                </div>
              </div>
            )}
            <div className="card__btn card__btn--next btn__arr">&rarr;</div>
          </div>
          <div className="card__count--cur">1 of 2</div>
        </div>
      )}
    </div>
  );
}

export default FlashCard;
