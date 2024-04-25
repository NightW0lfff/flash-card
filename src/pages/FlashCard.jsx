import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import { useParams } from "react-router-dom";
import { useSpeechSynthesis } from "react-speech-kit";
import useFetch from "../functions/useFetch";
import Card from "../components/Card";

function FlashCard() {
  const { id } = useParams();
  const [card, setCard] = useState({
    cards: [],
  });
  const { speak } = useSpeechSynthesis();

  const { data, error, isLoading, refetch } = useFetch(
    `http://localhost:8000/api/cards/${id}`
  );

  useEffect(() => {
    if (!data) return;
    setCard(data.card);
  }, [data]);

  // <button onClick={() => speak({ text: value })}>Speech</button>;

  return (
    <div className="main">
      <Header displayButton={"none"} />
      {error || isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flashcard">
          <div className="flashcard__overview">
            <div className="flashcard__overview--total">
              Flashcards-{card ? card.cards.length : "0"}
            </div>
            <div className="flashcard__overview--btn btn btn--create-card">
              Create Card
            </div>
          </div>
          <div className="flashcard__content">
            <div className="flashcard__btn flashcard__btn--prev btn__arr">
              &larr;
            </div>
            <Card />
            <div className="flashcard__btn flashcard__btn--next btn__arr">
              &rarr;
            </div>
          </div>
          <div className="flashcard__count--cur">1 of 2</div>
        </div>
      )}
    </div>
  );
}

export default FlashCard;
