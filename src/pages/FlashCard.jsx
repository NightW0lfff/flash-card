import React, { useEffect, useReducer, useState } from "react";
import Header from "../layouts/Header";
import { useParams } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";
import useFetch from "../functions/useFetch";
import Card from "../components/Card";

const reducer = (state, action) => {
  switch (action.type) {
    case "PREV_CARD":
      if (state === 0) return state;
      return state - 1;
    case "NEXT_CARD":
      return state + 1;
    default:
      return state;
  }
};

function FlashCard() {
  const { id } = useParams();
  const [card, setCard] = useState({
    cards: [],
  });
  const initialIndex = 0;
  const [curIndex, handleCardMove] = useReducer(reducer, initialIndex);

  const { data, error, isLoading, refetch } = useFetch(
    `http://localhost:8000/api/cards/${id}`
  );

  useEffect(() => {
    if (!data || !data.card) return;
    setCard(data.card);
  }, [data]);

  return (
    <div className="main">
      <Header displayButton={"none"} />
      {error || isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flashcard">
          <div className="flashcard__overview">
            <div className="flashcard__overview--total">
              Flashcards-{card.cards ? card.cards.length : "0"}
            </div>
            <div className="flashcard__overview--btn btn btn--create-card">
              Create Card
            </div>
          </div>
          <div className="flashcard__content">
            <div
              className="flashcard__btn flashcard__btn--prev btn__arr"
              onClick={(e) => handleCardMove({ type: "PREV_CARD" })}
            >
              &larr;
            </div>
            <Card Card={card.cards[curIndex]} />

            <div
              className="flashcard__btn flashcard__btn--next btn__arr"
              onClick={(e) =>
                card.cards.length - 1 > curIndex &&
                handleCardMove({ type: "NEXT_CARD" })
              }
            >
              &rarr;
            </div>
          </div>
          <div className="flashcard__count--cur">{`${card.cards.length < 1 ? 0 : curIndex + 1} of ${card.cards.length}`}</div>
        </div>
      )}
    </div>
  );
}

export default FlashCard;
